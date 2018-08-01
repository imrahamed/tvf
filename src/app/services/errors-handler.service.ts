import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {
  constructor( private injector: Injector ) {

  }
  handleError(error: Error) {
    const userservice = this.injector.get(UsersService);
    userservice.createNotification('error', 'Error Occured' , 'Something Went Wrong');
  }
}