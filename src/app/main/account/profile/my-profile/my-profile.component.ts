import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { MustMatch } from '../../authentication/_helper/must-match.validator';
import { MyProfileService } from '../../../../core/service/my-profile.service';
import { ChangePassword } from '../../../../core/models/change-password.model';
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
    else {
      this.router.navigate(["/login"]);
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
   this.is_summitted = true;
    let conformUserInfo = {
      nickname: this.userInfoForm.get('nickname').value,
      phone: this.userInfoForm.get('phone').value,
      country: this.userInfoForm.get('country').value.mDisplayName,
    }
    this.myProfileService.updateUserProfile(conformUserInfo).subscribe(response => {
      console.log(response)
      if(response.status == 204){
        this.isUserInfoEditing = false;
      };
    },
    error => {
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
      }
    );
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
        // this.changePasswordForm.get('oldpassword').markAsPristine();
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

  keepOriginalOrder = (a, b) => a.key;

}
