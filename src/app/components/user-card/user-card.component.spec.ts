import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { UsersService } from '../../services/users.service';
import { ErrorHandler } from '@angular/core';
import { ErrorsHandler } from '../../services/errors-handler.service';
import { HttpErrorInterceptor } from '../../services/http-interceptors.service';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCardComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

