import { Injectable, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from "@angular/common/http";
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {

  constructor(private http: Http, private notification: NzNotificationService) { }
  public getusers(page_no, per_page) {
    return this.http.get(`${environment.host}users/?page=${page_no}&per_page=${per_page}`);
  }

  public createuser(payload) {
    return this.http.post(`${environment.host}users`, payload);
  }

  public updateuser(id, payload) {
    return this.http.put(`${environment.host}users/${id}`, payload );
  }

  public deleteusers(id) {
    return this.http.delete(`${environment.host}users/${id}`);
  }
  public createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title,
      message);
  }

}
