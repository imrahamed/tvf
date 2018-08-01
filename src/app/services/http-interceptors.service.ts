import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
         HttpErrorResponse } from '@angular/common/http';
import { Observable, empty, of } from 'rxjs';
import {catchError} from "rxjs/internal/operators";
import { UsersService } from './users.service';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
    
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error, caught) => {
      const userservice = this.injector.get(UsersService);
      //intercept the respons error and displace it to the console
      console.log(error);
      if (error.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        userservice.createNotification('error', 'Error Occured' , 'Something Went Wrong');
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        userservice.createNotification('error', 'Error Occured' , environment.httpErrors[error.status].msg);
      }
      return of(error);
    }) as any);
  }
}