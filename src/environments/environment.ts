// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// API settings come from .env via the generated ./env.ts (see scripts/set-env.js).

import { env } from './env';

export const environment = {
  production: false,
  ...env
};
