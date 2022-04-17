import { DialogLoginNewModule } from './main/common-component/dialog-login-new/dialog-login-new.module';
import { DialogLoginNewComponent } from './main/common-component/dialog-login-new/dialog-login-new.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './main/angular-material/material.module';
import 'hammerjs';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from '@fuse/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

//service-worker
import { ServiceWorkerModule } from '@angular/service-worker';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AggridModule } from 'app/main/aggrid/aggrid.module';
import { PagesModule } from 'app/main/account/pages.module';
import { LoginComponent } from './main/account/authentication/login/login.component';
import { ForgotPasswordComponent } from './main/account/authentication/forgot-password/forgot-password.component';
import { ResentEmailComponent } from './main/account/authentication/resent-email/resent-email.component';
import { MyProfileComponent } from './main/account/profile/my-profile/my-profile.component';
import { MyProfileModule } from './main/account/profile/my-profile/my-profile.module';
import { EditorModule } from 'primeng/editor';

//Unbox-Host
import { RegisterUserModule } from './main/account/authentication/register-user/register-user.module';

import { SharedService } from './core/service/commom/shared.service';

import { DatePipe } from '@angular/common';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { environment } from 'environments/environment';

import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { ButtonLoadingComponent } from './main/common-component/button-loading/button-loading.component';
import { ButtonLoadingModule } from './main/common-component/button-loading/button-loading.module';

import { ToastModule } from 'primeng/toast';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TitleModule } from './main/common-component/title/title.module';

import { DialogConfirmComponent } from './main/common-component/dialog-confirm/dialog-confirm.component';

import { PlaceholderLoadingModule } from './main/common-component/placeholder-loading/placeholder-loading.module';
import { Observable, from } from 'rxjs';
import { NoCacheHeadersInterceptor } from './core/service/no-cache-service';

//My Customers
import { DialogLoginModule } from './main/common-component/dialog-login/dialog-login.component.module';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DialogConfirmNaepComponent } from './main/common-component/dialog-confirm-naep/dialog-confirm-naep.component';
import { DialogCommonNaepComponent } from './main/common-component/dialog-common-naep/dialog-common-naep.component';
import { DialogCommonButtonComponent } from './main/common-component/dialog-common-button/dialog-common-button.component';
import { RegisterUserComponent } from './main/account/authentication/register-user/register-user.component';
import { ContactUsComponent } from './main/account/contact-us/contact-us.component';
import { EmployeeManagementModule } from './main/account/employee-management/employee-management.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  // return new TranslateHttpLoader(httpClient);
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'forgot-password/:userId/:token1/:token2',
    component: ForgotPasswordComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'employee-management',
    component: ContactUsComponent,
  },
  {
    path: 'grid',
    redirectTo: 'grid',
  },
  {
    path: 'store',
    redirectTo: 'store',
  },
  {
    path: '**',
    redirectTo: 'my-profile',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent,
    DialogConfirmNaepComponent,
    DialogCommonNaepComponent,
    DialogCommonButtonComponent,
  ],

  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // Material moment date module
    MaterialModule,
    PagesModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    AggridModule,
    RegisterUserModule,

    DropdownModule,
    MultiSelectModule,

    MyProfileModule,
    //Form Module
    FormsModule,
    ReactiveFormsModule,
    //Payment Module
    // NgxMaterialTimepickerModule,
    MatProgressButtonsModule.forRoot(),
    ToastModule,
    ButtonLoadingModule,

    TitleModule,

    //service-worker
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AgGridModule.withComponents([]),
    PlaceholderLoadingModule,
    // Contact list
    DialogLoginModule,
    DialogLoginNewModule,
    EditorModule,
    EmployeeManagementModule
  ],
  bootstrap: [AppComponent],
  providers: [
    SharedService,
    BnNgIdleService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class AppModule {}
