import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const apiUrls = Object.values(environment.api);

/** Adds the X-API-KEY header to requests sent to the configured API endpoints. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (apiUrls.some(url => req.url.startsWith(url))) {
      req = req.clone({ setHeaders: { 'X-API-KEY': environment.apiKey } });
    }
    return next.handle(req);
  }
}
