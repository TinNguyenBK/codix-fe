import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MustMatch } from '../../authentication/_helper/must-match.validator';
import { MyProfileService } from '../../../../core/service/my-profile.service';
import { MyProfile } from '../../../../core/models/my-profile.model';
import { UpdateProfile } from '../../../../core/models/update-profile.model';
import { ChangePassword } from '../../../../core/models/change-password.model';
import { Router, NavigationEnd } from '@angular/router';
import * as helper from '../_helper/helper-fn';

import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { ToolbarComponent } from '../../../../layout/components/toolbar/toolbar.component';
import { ToolbarModule } from '../../../../layout/components/toolbar/toolbar.module';
import { ToolbarService } from '../../../../layout/components/toolbar/toolbar.service';
import { isNullOrUndefined } from 'util';
import { Title } from 'app/core/enum/title';
import { VerifyDialogComponent } from '@fuse/components/verify-dialog/verify-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/service/auth.service';
import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  storageUrl = environment.storageUrl;
  countryCodeToName = environment.countryCodeToName;
  stateCodeToName = null;
  stateCodeToNameFormOptions = null;
  myProfileImgUrl = '../../../../../assets/icons/ICON/AccountCircle.svg';
  myProfileImgUrlCol = '../../../../../assets/icons/ICON/AccountCircle.svg';
  changePasswordForm: FormGroup;
  changePasswordFormCol: FormGroup;
  title = Title.DOT;
  token: string;
  decoded: any;


  userProfile
  nickname = ''
  phone = ''
  email = ''
  id
  companyDistrict = ''
  areaName
  taxCode = ''
  addressCompany = ''
  addressRegisterCompany = ''
  listArea = [
    {
      mDisplayName: 'Bulgaria'
    },
    {
      mDisplayName: 'Vietnam'
    }
  ]
  countryDisplay
  country
  isPersonalInfoEditing = false;
  isColaboratorInfoEditing = false;
  isPasswordChanging = false;
  isPasswordChangingCol = false;
  isUserInfoEditing = false;
  userInfoForm: FormGroup;
  personalName1 = ''
  personalRole1 = ''
  companyEmail = ''
  personalPhone1
  personalName2 = ''
  personalRole2 = ''
  personalPhone2
  areaId
  isChangeUser: boolean = false
  isChangePersonal: boolean = false
  isChangeColaborator: boolean = false
  wrongOldPassword = false;
  wrongOldPasswordCol = false;
  isColaborator: boolean = false
  isSupplier: boolean = false
  isShow: boolean = false

  //Colaborator
  colaboratorProfile
  colaboratorName = ''
  colaboratorEmail = ''
  colaboratorPhone = ''
  colaboratorStreet = ''
  colaboratorWard= ''
  colaboratorDistrict = ''
  colaboratorProvince
  colaboratorProvinceTemp
  colaboratorAddress = ''
  avatarCompany = ''
  modeChange: boolean;
  avatar = '../../../../../assets/icons/ICON/AccountCircle.svg';
  avatarCol = '../../../../../assets/icons/ICON/AccountCircle.svg';
  isChange: boolean
  listProvince = []
  areaProvince
  companyCertificate
  isShowCertificate: boolean = false;
  certificatePreSignedUrl;
  companyRegisterAddress = ''

  constructor(
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private router: Router,
    private toolBarService: ToolbarService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token =  localStorage.getItem('token');
    if (!CheckNullOrUndefinedOrEmpty(this.token)) {
      this.decoded = jwt_decode(this.token);
        this.myProfileService.getUserProfile().subscribe(response => {
          this.isChange = false
          if (response.status === 200) {
           this.router.navigate(["/my-profile"]);
           this.userProfile = response.body
           this.nickname = this.userProfile.nickname
           this.email = this.userProfile.email
           this.id = this.userProfile.id
           this.phone = this.userProfile.phone
           this.countryDisplay = this.userProfile.country
           this.listArea.forEach(i => {
             if(i.mDisplayName ==  this.countryDisplay) {
              this.country = i
             }
           })
          } else {
          }
        }, err => {}
        );
    }
  
    this.userInfoForm = this.formBuilder.group(
      {
        nickname: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        email: [''],
      }
    )
    this.changePasswordForm = this.formBuilder.group(
      {
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', Validators.required]
      },
      {
        validator: [
          MustMatch('password', 'confirmpassword')
        ]
      }
    );
    
  }


  changeUpdate(){
    this.isChange = true
  }

  editUserInfo(): void {
    this.isUserInfoEditing = true;
    this.isPasswordChanging = false;
    if(!this.isChangeUser) {
      this.userInfoForm.setValue({
        'nickname': this.userProfile.nickname,
        'email':  this.userProfile.email,
        'phone': this.userProfile.phone,
        'country': this.country
      });
    }
    else {
      console.log( this.userInfoForm.get('country').value)
      this.userInfoForm.setValue({
        'nickname':  this.userInfoForm.get('nickname').value,
        'phone':  this.userInfoForm.get('phone').value,
        'country':  this.userInfoForm.get('country').value
      });
    }
  }

  public objectComparisonFunction = function( option, value ) : boolean {
    return  option.mDisplayName === value.mDisplayName;
  }

  public objectComparisonFunctionCol = function( option, value ) : boolean {
    return  option.mId === value.mId;
  }

  closeEditUserInfo(): void {
    this.isUserInfoEditing = false;
  }

  changePassword(): void {
    this.isPasswordChanging = true;
    this.isUserInfoEditing = false;
    this.isPersonalInfoEditing = false;
    this.changePasswordForm.reset();

  }

  changePasswordCol(): void {
    this.isPasswordChangingCol = true;
    this.isColaboratorInfoEditing = false;
    this.changePasswordFormCol.reset();

  }

  closeChangePassword(): void {
    this.isPasswordChanging = false;
    this.wrongOldPassword = false;
  }

  closeChangePasswordCol(): void {
    this.isPasswordChangingCol = false;
    this.wrongOldPasswordCol = false;
  }

  setAreaName(event) {
    this.country = event.value.mDisplayName
    this.isChangeUser = true
  }

  setProvinceCol(event) {
    this.colaboratorProvince = event.value.mDisplayName
  }
  
  
  saveNewUserInfo(): void {
    let conformUserInfo = {
      nickname: this.userInfoForm.get('nickname').value,
      phone: this.userInfoForm.get('phone').value,
      country: this.userInfoForm.get('country').value.mDisplayName,
    }
    this.myProfileService.updateUserProfile(conformUserInfo).subscribe(response => {
      if(response.status == 204){
        this.isUserInfoEditing = false;
      };
    });
    this.nickname = this.userInfoForm.get('nickname').value;
    this.phone = this.userInfoForm.get('phone').value;
    this.countryDisplay = this.userInfoForm.get('country').value.mDisplayName
  }

  saveNewPassword(): void {
    const changePassword: ChangePassword = new ChangePassword(
      // this.changePasswordForm.get('oldpassword').value,
      this.changePasswordForm.get('password').value,
    );

    this.myProfileService.changePasswordSup(changePassword).subscribe(response => {
      if (response.status === 201) {
        this.wrongOldPassword = true;
        this.changePasswordForm.get('oldpassword').markAsPristine();
      }

      if (response.status === 204) {
        this.wrongOldPassword = false;
        Swal.fire({
          text: 'Change password successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => { this.isPasswordChangingCol = false; }, 500);
        this.isPasswordChanging = false;
      }
    },error => {
      Swal.fire({
        title: 'Can not change password!',
        text: error.error.error.details.message,
      });
      this.isPasswordChanging = false;
    });

  }

  setFormState(event): void {
    const selectedCountryCode = event.value;
    this.stateCodeToNameFormOptions = environment.countryCodeToStates[selectedCountryCode];
  }

  keepOriginalOrder = (a, b) => a.key;

}
