import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { SelectItem } from 'primeng/api';
import { MustMatch } from '../_helper/must-match.validator';
import { DialCodeComponent } from '../dial-code/dial-code.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { pattern } from 'app/core/enum/pattern';
import { Title } from 'app/core/enum/title';
import { CommonDialogComponent } from "app/main/common-dialog/common-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: fuseAnimations,
})
export class RegisterUserComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  storageUrl = environment.storageUrl;
  registerForm: FormGroup;
  designations: SelectItem[];
  is_summitted: boolean = false;
  
  title = Title.LEFT_LINK;
  message :string = '';
  listArea = [
    {
      mDisplayName: 'Bulgaria'
    },
    {
      mDisplayName: 'Vietnam'
    }
  ]
  on
  selectedDesignation = []
  supplier
  areaId
  isShowUpload: boolean = false
  shown: boolean = false
  preSignedUrl;
  hide = true
  hidereturn = true

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    public  dialog    : MatDialog,
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };

    this._unsubscribeAll = new Subject();
  }

  @ViewChild(DialCodeComponent) dialcode: DialCodeComponent;

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group(
      {
        nickname: ['', [Validators.required,  Validators.maxLength(40)]],
        email: ['', [Validators.required, , Validators.pattern(pattern.email), Validators.maxLength(40)]],
        phone: ['', [Validators.required, Validators.pattern(pattern.phone_number), Validators.minLength(8), Validators.maxLength(15)]],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        confirmpassword: ['', [Validators.required,  Validators.minLength(8), Validators.maxLength(40)]],
      },
      {
        validator: MustMatch('password', 'confirmpassword'),
      }
    );

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  
  onSubmit() {
    this.is_summitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let user = {
      nickname: this.registerForm.value.nickname,
      email:  this.registerForm.value.email,
      phone:  this.registerForm.value.phone,
      password: this.registerForm.value.password,
      country: this.registerForm.value.country.mDisplayName,
    }

    this.authService.registerUser(user).subscribe(response => {
      if(response.status === 200) {
        localStorage.setItem("token", response.body.token)
        this.router.navigate(["/auth/register-supplier-done"], { queryParams: { email: this.registerForm.value.mEmail }});
      }
    },error => {
      const dialogNotifi = this.dialog.open(CommonDialogComponent, {
        width: "500px",
        data: {
          message: error.error.error.details.message,
          title: "NOTIFICATION",
          colorButton: false
        },
      });
      dialogNotifi.afterClosed().subscribe(data =>
      {
        return
      })
    });
  }

  uploadPage() {

  }

  backToLogin() {
    this.router.navigate(["/login"],);
  }

  changeArea(event) {
    this.areaId = event.value.mId
  }

  changeButton() {
   this.isShowUpload = !this.isShowUpload
  }
}

function phoneNumberValidator(registerForm: FormControl) {
  if (isNaN(registerForm.value) === false && !registerForm.value.includes(' ')) {
    return null;
  }
  return { phoneNum: true };
}
