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

  //Supplier
  supplierProfile
  mDisplayName = ''
  companyName = ''
  companyAddress = ''
  companyWard = ''
  companyDistrict = ''
  areaName
  taxCode = ''
  addressCompany = ''
  addressRegisterCompany = ''
  listArea = []
  areaNameDisplay
  isPersonalInfoEditing = false;
  isColaboratorInfoEditing = false;
  isPasswordChanging = false;
  isPasswordChangingCol = false;
  isCompanyInfoEditing = false;
  companyInfoForm: FormGroup;
  personalName1 = ''
  personalRole1 = ''
  companyEmail = ''
  personalPhone1
  personalName2 = ''
  personalRole2 = ''
  personalPhone2
  areaId
  isChangeCompany: boolean = false
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
    this.getArea()
    this.token =  localStorage.getItem('token');
    if (!CheckNullOrUndefinedOrEmpty(this.token)) {
      this.decoded = jwt_decode(this.token);
      if(this.decoded.mRole == 'COLLABORATOR') {
        this.isColaborator = true
        this.myProfileService.getColaboratorProfile().subscribe(response => {
          if (response.status === 200) {
           this.router.navigate(["/my-profile"]);
           this.colaboratorProfile = response.body
           this.colaboratorName = this.colaboratorProfile.mDisplayName
           this.colaboratorEmail = this.colaboratorProfile.mEmail
           this.colaboratorPhone =  this.colaboratorProfile.mTelNumber
           this.colaboratorStreet =  this.colaboratorProfile.mStreet
           this.colaboratorWard =  this.colaboratorProfile.mWard
           this.colaboratorDistrict =  this.colaboratorProfile.mDistrict
          //  this.colaboratorProvince =  this.colaboratorProfile.mProvince
           this.colaboratorProvince = this.listArea.find(i => {
            return i.mDisplayName == this.colaboratorProfile.mProvince
           }),
           this.colaboratorAddress = this.colaboratorStreet + ', ' + this.colaboratorWard + ', ' + this.colaboratorDistrict + ', ' +  this.colaboratorProvince.mDisplayName;
           if(!CheckNullOrUndefinedOrEmpty(this.colaboratorProfile.mAvatar)) {
            this.avatarCol = this.colaboratorProfile.mAvatar
           }
          } else {
            // this.router.navigate(["/login"]);
          }
        }, err => {}
        );
      }
      else if(this.decoded.mRole == 'SUPPLIER') {
        this.isSupplier = true
        this.myProfileService.getSupplierProfile().subscribe(response => {
          this.isChange = false
          if (response.status === 200) {
           this.router.navigate(["/my-profile"]);
           this.supplierProfile = response.body
           this.companyName = this.supplierProfile.mDisplayName
           this.areaName = this.supplierProfile.mArea
           this.areaId = this.supplierProfile.mArea.mId
           this.areaNameDisplay = this.supplierProfile.mArea.mDisplayName
          //  this.addressCompany = this.supplierProfile.mStreet + ', ' + this.supplierProfile.mWard + ', ' + this.supplierProfile.mDistrict + ', ' +  this.supplierProfile.mArea.mDisplayName
          //  this.addressCompany = this.supplierProfile.mAddress
          //  this.addressRegisterCompany = this.supplierProfile.mRegisteredBusinessAddress
          this.companyAddress = this.supplierProfile.mAddress
           this.companyRegisterAddress = this.supplierProfile.mRegisteredBusinessAddress
           this.taxCode  = this.supplierProfile.mTaxCode
           this.companyEmail = this.supplierProfile.mEmail 
           this.personalPhone1 =  this.supplierProfile.mTelNumber1
           this.personalRole1 = this.supplierProfile.mRepresentativeRole1
           this.personalName1 = this.supplierProfile.mRepresentative1
           this.personalPhone2 =  this.supplierProfile.mTelNumber2
           this.personalRole2 = this.supplierProfile.mRepresentativeRole2
           this.personalName2 = this.supplierProfile.mRepresentative2
          //  this.companyWard = this.supplierProfile.mWard
          //  this.companyDistrict = this.supplierProfile.mDistrict
           if(!CheckNullOrUndefinedOrEmpty(this.supplierProfile.mCertificate)) {
            this.companyCertificate = this.supplierProfile.mCertificate
            this.isShowCertificate = true
           }
           if(!CheckNullOrUndefinedOrEmpty(this.supplierProfile.mAvatar)) {
            this.avatar = this.supplierProfile.mAvatar
           }
           if(!CheckNullOrUndefinedOrEmpty(this.avatar)){
             this.isShow = true
           }
          //  this.myProfileImgUrl = this.supplierProfile.mAvatar
          } else {
            // this.router.navigate(["/login"]);
          }
        }, err => {}
        );
      }
    }
  
    this.companyInfoForm = this.formBuilder.group(
      {
        areaName: ['', Validators.required],
        companyName: ['', Validators.required],
        taxCode: ['', Validators.required],
        companyAddress: ['', Validators.required],
        companyRegisterAddress: ['', Validators.required],
        // companyWard: ['', Validators.required],
        // companyDistrict: ['', Validators.required],
        companyEmail: [''],
      }
    )
    this.changePasswordForm = this.formBuilder.group(
      {
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        newpassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmpassword: ['', Validators.required]
      },
      {
        validator: [
          MustMatch('newpassword', 'confirmpassword')
        ]
      }
    );

    this.changePasswordFormCol = this.formBuilder.group(
      {
        oldpasswordCol: ['', [Validators.required, Validators.minLength(8)]],
        newpasswordCol: ['', [Validators.required, Validators.minLength(8)]],
        confirmpasswordCol: ['', Validators.required]
      },
      {
        validator: [
          MustMatch('newpasswordCol', 'confirmpasswordCol')
        ]
      }
    );
    
  }

  getArea() {
    this.authService.getArea().subscribe(data=>{
     this.listArea = data 
    })
  }

  changeUpdate(){
    this.isChange = true
  }

  editCompanyInfo(): void {
    this.isCompanyInfoEditing = true;
    this.isPasswordChanging = false;
    this.isPersonalInfoEditing = false;
    if(!this.isChangeCompany) {
      this.companyInfoForm.setValue({
        'companyName': this.supplierProfile.mDisplayName,
        'taxCode':  this.supplierProfile.mTaxCode,
        'companyAddress': this.supplierProfile.mAddress,
        'companyRegisterAddress': this.supplierProfile.mRegisteredBusinessAddress,
        'areaName': this.supplierProfile.mArea,
        'companyEmail': this.supplierProfile.mEmail
      });
    }
    else {
      this.companyInfoForm.setValue({
        'companyName':  this.companyInfoForm.get('companyName').value,
        'taxCode':  this.companyInfoForm.get('taxCode').value,
        'companyAddress':  this.companyInfoForm.get('companyAddress').value,
        'companyRegisterAddress': this.companyInfoForm.get('companyRegisterAddress').value,
        'areaName': this.companyInfoForm.get('areaName').value
      });
    }
  }

  public objectComparisonFunction = function( option, value ) : boolean {
    return  option.mId === value.mId;
  }

  public objectComparisonFunctionCol = function( option, value ) : boolean {
    return  option.mId === value.mId;
  }

  closeEditCompanyInfo(): void {
    this.isCompanyInfoEditing = false;
  }

  changePassword(): void {
    this.isPasswordChanging = true;
    this.isCompanyInfoEditing = false;
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
    this.areaId = event.value.mId
    this.areaProvince = event.value.mDisplayname
    this.areaNameDisplay = event.value.mDisplayName
    this.isChangeCompany = true
  }

  setProvinceCol(event) {
    this.colaboratorProvince = event.value.mDisplayName
  }
  
  
  saveNewCompanyInfo(): void {
    let conformCompanyInfo = {
      mAreaId: this.areaId,
      mDisplayName: this.companyInfoForm.get('companyName').value,
      mTaxCode: this.companyInfoForm.get('taxCode').value,
      mAddress: this.companyInfoForm.get('companyAddress').value,
      mRegisteredBusinessAddress: this.companyInfoForm.get('companyRegisterAddress').value,
      // mWard: this.companyInfoForm.get('companyWard').value,
      // mDistrict: this.companyInfoForm.get('companyDistrict').value,
      mRepresentative1: this.personalName1,
      mRepresentativeRole1: this.personalRole1,
      mTelNumber1: this.personalPhone1,
      mRepresentative2: this.personalName2,
      mRepresentativeRole2: this.personalRole2,
      mTelNumber2: this.personalPhone2,
      mCertificate: this.certificatePreSignedUrl,
    }
    this.myProfileService.updateSupplierProfile(conformCompanyInfo).subscribe(response => {
      if(response.status == 204){
        this.isCompanyInfoEditing = false;
      };
    });

    this.areaNameDisplay = this.areaNameDisplay
    this.areaName = this.companyInfoForm.get('areaName').value;
    this.companyName = this.companyInfoForm.get('companyName').value;
    this.taxCode = this.companyInfoForm.get('taxCode').value;
    this.companyAddress = this.companyInfoForm.get('companyAddress').value 
    this.companyRegisterAddress = this.companyInfoForm.get('companyRegisterAddress').value 
    
  }

  saveNewPassword(): void {
    const changePassword: ChangePassword = new ChangePassword(
      this.changePasswordForm.get('oldpassword').value,
      this.changePasswordForm.get('newpassword').value,
      // this.changePasswordForm.get('confirmpassword').value
    );

    this.myProfileService.changePasswordSup(changePassword).subscribe(response => {
      if (response.status === 201) {
        this.wrongOldPassword = true;
        this.changePasswordForm.get('oldpassword').markAsPristine();
      }

      if (response.status === 204) {
        this.wrongOldPassword = false;
        Swal.fire({
          text: 'Mật khẩu được thay đổi thành công!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => { this.isPasswordChangingCol = false; }, 500);
        this.isPasswordChanging = false;
      }
    },error => {
      Swal.fire({
        title: 'Không thể thay đổi mật khẩu',
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
