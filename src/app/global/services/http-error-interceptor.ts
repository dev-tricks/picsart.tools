import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor () {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        access_token: token
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          sessionStorage.clear();
          window.location.href = 'https://kc.picsart.tools/auth/realms/master/protocol/openid-connect/logout?redirect_uri=' + window.location.href;
        } else if (err.status === 500) {

        }
      }
    });
  }
}
