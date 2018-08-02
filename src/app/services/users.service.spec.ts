import { TestBed, inject, async } from '@angular/core/testing';

import { UsersService } from './users.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { ErrorHandler } from '@angular/core';
import { ErrorsHandler } from './errors-handler.service';
import { HttpErrorInterceptor } from './http-interceptors.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule
      ],
      providers: [
        UsersService,
        {
          provide: ErrorHandler,
          useClass: ErrorsHandler,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        { provide: NZ_I18N, useValue: en_US }]
    });
  });

  it('user creation', async(inject([UsersService], (service: UsersService) => {
    service.createuser({name:"test", job: "jobtest"}).subscribe(
      (res) => {
        setTimeout(() => {
          console.log(res.json().createdAt);
          expect(res.json().createdAt).toBeTruthy();
        }, 2000);
        
      }
    )
  })));

  it('user updation', async(inject([UsersService], (service: UsersService) => {
    service.updateuser(1,{name:"test", job: "updated"}).subscribe(
      (res) => {
        setTimeout(() => {
          console.log(res.json().updatedAt);
          expect(res.json().updatedAt).toBeTruthy();
        }, 2000);

        
      }
    )
  })));
  it('user updation failing', async(inject([UsersService], (service: UsersService) => {
    service.updateuser(null,{}).subscribe(
      (res) => {
        const name = res.json().name;
        console.log(name);
        setTimeout(() => {
          expect(name).toBeUndefined();
        }, 2000);
      }
    )
  })));
  it('get users', async(inject([UsersService], (service: UsersService) => {
    service.getusers(1,10).subscribe(
      (res) => {
        console.log(res.json());
        setTimeout(() => {
          expect(res.json().data.length).toBe(10);
        }, 2000);
      }
    )
  })));
});
