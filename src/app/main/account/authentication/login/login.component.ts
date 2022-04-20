import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { FuseConfigService} from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService} from '../../../../core/service/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/core/service/api.service';
import { MyProfileService } from 'app/core/service/my-profile.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from 'app/core/enum/title';
import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import * as jwt_decode from 'jwt-decode';
import { MatDialog } from "@angular/material/dialog";
import { CommonDialogComponent } from "app/main/common-dialog/common-dialog.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations : fuseAnimations
})
export class LoginComponent implements OnInit {
  designations =[]
  selectedDesignation
  loginForm: FormGroup;
  loginAlert : boolean;
  loginAlert204 : boolean = false;
  loginAlert202 : boolean = false;
  loginAlert203 : boolean = false;
  redirect: string;
  id: number;
  token: string;
  language: string;
  showLanguage: string;
  tokenParam: string;
  isRegister : boolean = false;
  hide = true
  dataNoRegister : any;

  active: boolean = false;
  buttonName: string = 'LOG IN';
  title = Title.LEFT_LINK;
  message :string = ''
  returnUrl : string = '';
  listRole;
  slides = [
  {image: "assets/images_codix/CodixImg1.jpeg"},
  {image: "assets/images_codix/CodixImg2.jpeg"},
  {image: "assets/images_codix/CodixImg3.jpeg"}
  ];
  isColaborator: boolean = false
  isSupplier: boolean = false
  isRemember: boolean = false
  isRememberTemp: boolean = false
  decoded: any;

  constructor
  ( 
    private _fuseConfigService : FuseConfigService,
    private _formBuilder : FormBuilder,
    private _authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private myProfileService: MyProfileService,
    private _translateService: TranslateService,
    public dialog: MatDialog,
  )         
  {
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
    }
  }

  ngOnInit(): void {
   this.isRemember = !!localStorage.getItem("isRemember");
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (!this.returnUrl)
      this.returnUrl = localStorage.getItem('returnUrl');
    if (!this.returnUrl)
      this.returnUrl = '/my-profile';
    this.route.queryParams.subscribe((params) => {
      this.tokenParam = params.tokenParam;
    });
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^.{8,}$')]]
    });
  }
  onSubmit(){
    this.active = true;
    this.buttonName = "Loading...";
    let loginForm = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loginForm.value.email = this.loginForm.value.email.trim().toLowerCase();
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

  changeRole(event) {
     if(event.value.value == 'Colaborator') {
       this.isColaborator = true
       this.isSupplier = false
     }
     else if (event.value.value == 'Supplier') {
      this.isSupplier = true
      this.isColaborator = false
     }
  }

  nextToForgotPassword(){
    if (this.language == undefined) {
      this.language = 'en'
    }
    this.router.navigate(["/forgot-password"], 
    { queryParams: { language: this.language} });
  }
  nextToResentMail(){
    if (this.language == undefined) {
      this.language = 'en'
    }
    this.router.navigate(["/resent-email"], 
    { queryParams: { language: this.language} });
  }

  changeButton(e) {
    this.isRemember = e.checked
   }

  nextToSignUp() {
    this.router.navigate(["/register-user"])
  }


}


