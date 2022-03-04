import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

import { ResetPassword } from '../../../../core/models/reset-password.model';

import { AuthService } from '../../../../core/service/auth.service';
import { MustMatch } from '../_helper/must-match.validator';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'app/core/service/commom/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from "app/main/common-dialog/common-dialog.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
  token1: string;
  token2: string;
  userId: string;
  isValidToken: boolean;
  isTokenVerifyError: boolean;
  isEmailSent: boolean;
  isEmailSentError: boolean;
  isPasswordReset: boolean;
  isPasswordResetError: boolean;
  serverResponseMsg: string;
  forgotForm: FormGroup;
  resetForm: FormGroup;
  language: string;
  showLanguage: string;
  isShowCheck: boolean;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private _translateService: TranslateService,
    public  dialog    : MatDialog,
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.isEmailSent = false;
    this.isEmailSentError = false;
    this.isPasswordReset = false;
    this.isPasswordResetError = false;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.token1 = params.get('token1');
      this.token2 = params.get('token2');
      this.userId = params.get('userId');
      if (this.token1 == null) {
        this.isValidToken = false;
        this.forgotForm = this._formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
        });
      }
      else {
        this.isValidToken = true
        if (this.isValidToken) {
          this.resetForm = this._formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required]
          },
            {
              validator: [
                MustMatch('newPassword', 'confirmPassword')
              ]
            });
        }
        else {
          this.isTokenVerifyError = true;
        }
      }
    });

    // this.activatedRoute.queryParams.subscribe( params => {
    //   this.language = params.language;

    //   if (this.language == 'en') {
    //     this.showLanguage = 'English'
    //   } 
    //   else if (this.language == 'en') {
    //     this.showLanguage = 'Chinese'
    //   }

    //   this._translateService.setDefaultLang('en');
    //   const browserLang = this._translateService.getBrowserLang();
    //   this._translateService.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    // })

  }

  retryRequest() {
    this.isEmailSentError = false;
    this.isEmailSent = false
    this.isValidToken = false
    this.forgotForm.controls['email'].setValue('');
    this.router.navigate(['/forgot-password']);
  }

  onSubmit(type: string) {
    if (type === 'forgot') {
      this.forgotForm.value.email = this.forgotForm.value.email.trim().toLowerCase();
      this.authService.forgotPassword(this.forgotForm.value.email).subscribe(response => {
        if (response.status >= 200  && response.status < 300) {
          this.isEmailSent = true;
          this.isShowCheck = true;
        }
        else {
          this.isEmailSentError = true;
          this.isShowCheck = false;

        }
        // this.serverResponseMsg = response.message;
        // if (response.status >= 200  && response.status < 300) {
        //   this.isShowCheck = true;
        // }
        // else {
        //   this.isShowCheck = false;
        // }
      },error => {
        const dialogNotifi = this.dialog.open(CommonDialogComponent, {
          width: "500px",
          data: {
            message: error.error.error.details.message,
            title: "THÔNG BÁO",
            colorButton: false
          },
        });
        dialogNotifi.afterClosed().subscribe(data =>
        {
          this.forgotForm.value.email = ''
          return
        })
      });
    }

    if (type === 'reset') {
      // const resetPassword: ResetPassword = {
      //   newPassword: this.resetForm.value.newPassword,
      //   confirmPassword: this.resetForm.value.confirmPassword,
        
      //   token1: this.token1,
      // };
      // this.authService.resetPassword(resetPassword).subscribe(response => {
      //   if (response.code === "200") {
      //     this.isPasswordReset = true;
      //   }
      //   else {
      //     this.isPasswordResetError = true;
      //   }
      //   this.serverResponseMsg = response.message;
      // });
      this.authService.resetPassword({userId: this.userId, token1: this.token1, token2: this.token2, mPassword: this.resetForm.value.newPassword}).subscribe(res => {
        if (res.status >= 200 && res.status < 300) {
          
          // this.isPasswordReset = true;
          const dialogNotifi = this.dialog.open(CommonDialogComponent, {
            width: "500px",
            data: {
              message: 'Mật khẩu thay đổi thành công.',
              title: "THÔNG BÁO",
              colorButton: false
            },
          });
          dialogNotifi.afterClosed().subscribe(data =>
          {
            this.router.navigate(["/login"],);
          })

        } else {
          this.serverResponseMsg = "Thay đổi mật khẩu thất bại";
        }
        // else {
        //   this.serverResponseMsg = "Password has been changed.";
        // }
      //  this.serverResponseMsg = response.message;
      },error => {
        const dialogNotifi = this.dialog.open(CommonDialogComponent, {
          width: "500px",
          data: {
            message: error.error.error.details.message,
            title: "THÔNG BÁO",
            colorButton: false
          },
        });
        dialogNotifi.afterClosed().subscribe(data =>
        {
          return
        })
      });
    }
  }

  getLanguge(language) {
    this.language = language

    if (language == 'en') {
      this.showLanguage = 'English'
    } else if (language == 'en') {
      this.showLanguage = 'Chinese'
    }
    this._translateService.setDefaultLang(this.language);
    const browserLang = this._translateService.getBrowserLang();
    this._translateService.use(this.language);
  }

  backToLogin() {
    this.router.navigate(["/login"], 
    { queryParams: { language: this.language} });
  }
}
