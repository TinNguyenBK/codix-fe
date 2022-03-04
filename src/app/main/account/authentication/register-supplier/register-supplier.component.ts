import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';

import { isNullOrUndefined } from 'util';
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
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { User, UserNoRegister } from '../../../../core/models/user.model';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { pattern } from 'app/core/enum/pattern';
import { Title } from 'app/core/enum/title';
import { Supplier } from '../../../../core/models/supplier.model';
import { CommonDialogComponent } from "app/main/common-dialog/common-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-supplier',
  templateUrl: './register-supplier.component.html',
  styleUrls: ['./register-supplier.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: fuseAnimations,
})
export class RegisterSupplierComponent implements OnInit {
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
        role: [''],
        mAreaId: ['', Validators.required],
        mDisplayName: ['', Validators.required],
        mEmail: ['', [Validators.required, , Validators.pattern(pattern.email)]],
        mTaxCode: ['', Validators.required],
        mAddress: ['', Validators.required],
        mRegisteredBusinessAddress: ['', Validators.required],
        // mDistrict: ['', Validators.required],
        // mWard: ['', Validators.required],
        mRepresentative1: ['', Validators.required],
        mRepresentativeRole1: ['', Validators.required],
        mTelNumber1: ['', [Validators.required, Validators.pattern(pattern.phone_number)]],
        mRepresentative2: ['', Validators.required],
        mRepresentativeRole2: ['', Validators.required],
        mTelNumber2: ['', [Validators.required, Validators.pattern(pattern.phone_number)]],
        mPassword: ['', [Validators.required, Validators.minLength(8)]],
        mCertificate: [''],
        mConfirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('mPassword', 'mConfirmPassword'),
      }
    );

    this.registerForm.controls['role'].setValue('Nhà cung cấp');
    // this.getArea()
    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  
  onSubmit() {
    this.is_summitted = true;
    this.registerForm.controls['mEmail'].enable();
    if (this.registerForm.invalid) {
      return;
    }
    let supplier = {
      mAreaId: this.areaId,
      mDisplayName: this.registerForm.value.mDisplayName,
      mTaxCode: this.registerForm.value.mTaxCode,
      mAddress:  this.registerForm.value.mAddress,
      mRegisteredBusinessAddress: this.registerForm.value.mRegisteredBusinessAddress,
      mEmail:  this.registerForm.value.mEmail,
      // mWard:  this.registerForm.value.mWard,
      // mDistrict:  this.registerForm.value.mDistrict,
      mRepresentative1:  this.registerForm.value.mRepresentative1,
      mRepresentativeRole1:  this.registerForm.value.mRepresentativeRole1,
      mTelNumber1:  this.registerForm.value.mTelNumber1,
      mRepresentative2:  this.registerForm.value.mRepresentative2,
      mRepresentativeRole2:  this.registerForm.value.mRepresentativeRole2,
      mTelNumber2:  this.registerForm.value.mTelNumber2,
      mPassword: this.registerForm.value.mPassword,
      mCertificate: !CheckNullOrUndefinedOrEmpty(this.preSignedUrl) ? this.preSignedUrl.split('?')[0] : ''
    }

    this.authService.registerSupplier(supplier).subscribe(response => {
      if(response.status === 200) {
        this.router.navigate(["/auth/register-supplier-done"], { queryParams: { email: this.registerForm.value.mEmail }});
      }
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
  
  onSelectFile(event): void {
     if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type != "image/bmp" && file.type != "image/jpeg" && file.type != "image/png" && file.type != "application/pdf") {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
     
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
       
         let picture_name = file.name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
         this.authService.uploadCertificate(picture_name, file.type.split('/')[1]).subscribe(response => {
              // console.log(response)
              this.preSignedUrl = response.body.preSignedUrl;
              this.authService.uploadFiletoS3(this.preSignedUrl, file.type, file).subscribe(response => {
                Swal.fire({
                  text: 'Tải giấy chứng nhận thành công!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                });
              }, error => {
                Swal.fire({
                  title: 'Không thể tải giấy chứng nhận.',
                  text: 'Vui lòng thử lại!',
                });
              }
              );
          });
       };
     }
   }
   
 
}

function phoneNumberValidator(registerForm: FormControl) {
  if (isNaN(registerForm.value) === false && !registerForm.value.includes(' ')) {
    return null;
  }
  return { phoneNum: true };
}
