import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { UserCardComponent } from './components/user-card/user-card.component';
import { HttpErrorInterceptor } from './services/http-interceptors.service';
import { ErrorsHandler } from './services/errors-handler.service';
import { ErrorHandler } from '@angular/core';
import { UsersService } from './services/users.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserCardComponent
      ],
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
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'tvf-assignment'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('tvf-assignment');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to tvf-assignment!');
  // }));
});
