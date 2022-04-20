import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MustMatch } from '../../authentication/_helper/must-match.validator';
import { MyProfileService } from '../../../../core/service/my-profile.service';
import { Router} from '@angular/router';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { ToolbarService } from '../../../../layout/components/toolbar/toolbar.service';
import { Title } from 'app/core/enum/title';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/service/auth.service';
import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';
import * as jwt_decode from 'jwt-decode';
import { pattern } from 'app/core/enum/pattern';
import { CommonDialogComponent } from 'app/main/common-dialog/common-dialog.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  storageUrl = environment.storageUrl;
  myProfileImgUrl = '../../../../../assets/icons/ICON/AccountCircle.svg';
  myProfileImgUrlCol = '../../../../../assets/icons/ICON/AccountCircle.svg';
  changePasswordForm: FormGroup;
  title = Title.DOT;
  token: string;
  decoded: any;
  userProfile
  nickname = ''
  phone = ''
  email = ''
  id
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

  isChangeUser: boolean = false
  isChangePersonal: boolean = false
  isChangeColaborator: boolean = false
  wrongOldPassword = false;
  wrongOldPasswordCol = false;
  isColaborator: boolean = false
  isSupplier: boolean = false
  isShow: boolean = false
  isChange: boolean
  is_summitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private myProfileService: MyProfileService,
    private router: Router,
    private toolBarService: ToolbarService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.token =  localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!CheckNullOrUndefinedOrEmpty(this.token)) {
    }
    else {
      this.router.navigate(["/employee-management"]);
    }
  
    this.userInfoForm = this.formBuilder.group(
      {
        nickname: ['', [Validators.required,  Validators.maxLength(40)]],
        phone: ['', [Validators.required, Validators.pattern(pattern.phone_number), Validators.minLength(8), Validators.maxLength(15)]],
        country: ['', Validators.required],
        email: [''],
      }
    )
    this.changePasswordForm = this.formBuilder.group(
      {
        // oldpassword: ['', [Validators.required, Validators.minLength(8),  Validators.maxLength(40)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
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
  
  saveNewUserInfo(): void {
  }

  saveNewPassword(): void {

  }

  keepOriginalOrder = (a, b) => a.key;

}
