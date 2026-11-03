# syntax=docker/dockerfile:1.4

# ---- Build stage ----
# Angular 10.1 supports Node ^12.14 || ^14; scripts/set-env.js needs Node 14 (`??`).
# Node 14.21.3 ships npm 6.14, matching package-lock.json lockfileVersion 1.
FROM node:14.21.3-bullseye-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# API settings are baked into the bundle at build time by scripts/set-env.js.
# Supply them via a BuildKit secret (your .env file) so they aren't kept in image layers:
#   docker build --secret id=env,src=.env -t ventus-web .
RUN --mount=type=secret,id=env,target=/app/.env \
    npm run build -- --prod

# ---- Runtime stage ----
FROM nginx:1.27-alpine

COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
EOF

COPY --from=build /app/dist/blk-vol1 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
