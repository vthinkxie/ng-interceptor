import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpClient, HttpBackend } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  httpClient = new HttpClient(this.httpBackend);
  constructor(private httpBackend: HttpBackend) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      flatMap(event => {
        if (event instanceof HttpResponse) {
          const responseBody = event.body as any;
          if (responseBody.success === false) {
            return this.httpClient.get('/assets/back_up.json').pipe(
              map(data => {
                return event.clone({
                  body: data
                });
              })
            );
          } else {
            return of(event);
          }
        } else {
          return of(event);
        }
      })
    );
  }
}
