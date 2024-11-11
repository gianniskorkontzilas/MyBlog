import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Εδώ μπορείτε να τροποποιήσετε την αίτηση ή να προσθέσετε headers
    const modifiedReq = req.clone({
      setHeaders: { Authorization: 'Bearer YOUR_TOKEN' }
    });

    return next.handle(modifiedReq);
  }
}
