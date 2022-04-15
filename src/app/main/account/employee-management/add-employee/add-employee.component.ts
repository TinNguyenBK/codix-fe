import { Component, OnInit } from '@angular/core';
import { Title } from 'app/core/enum/title';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'app/main/common-component/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  title = Title.LEFT_LINK;
  experienceLevel: Experience[];
  generalInforForm: FormGroup;
  isSubmit: boolean = false;
  generalInfor: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router : Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.experienceLevel = [
      {id: '1', year: '1'},
      {id: '2', year: '2'},
      {id: '3', year: '3'},
      {id: '4', year: '4'},
      {id: '5', year: '5'},
    ]; 
    this.generalInforForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      level: ['', Validators.required],
      startingDate: ['', Validators.required],
      salary: ['', Validators.required],
      vacationDate: ['', Validators.required],
    });
  }

  // addEmployee(event){
  //   this.isSubmit = true;
  //   if(this.generalInforForm.invalid){
  //     return;
  //   }else{
  //     const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //       width: '500px',
  //       data: { message:   "Bạn có muốn thêm thông tin của sản phẩm này không?",
  //       type : "APPROVED" }
  //     });
  //     dialogRef.afterClosed().subscribe(result => {

  //      }
  //   }
  // }

  addEmployee(){
    this.isSubmit = true;
    if(this.generalInforForm.invalid){
      return;
    }else{
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '500px',
        data: { message:   "Do you want to create employee?",
        type : "APPROVED" }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) { 
          this.generalInfor = {
           
          }

          // this.generalInforService.createProductCategory(this.decoded.mId,  this.generalInfor).subscribe(response => {
          //   if(response.status >=200 && response.status < 300) {
          //     const dialogNotifi = this.dialog.open(CommonDialogComponent, {
          //       width: "500px",
          //       data: {
          //         message:'Thêm thông tin sản phẩm thành công.',
          //         title: "THÔNG BÁO",
          //         colorButton: false
          //       },
          //     });
          //     dialogNotifi.afterClosed().subscribe(data =>
          //     {
          //       this.router.navigate(['/product-library'])
          //     })
          //   }
          // },error => {
          //   const dialogNotifi = this.dialog.open(CommonDialogComponent, {
          //     width: "500px",
          //     data: {
          //       message: error.error.error.details.message,
          //       title: "THÔNG BÁO",
          //       colorButton: false
          //     },
          //   });
          //   dialogNotifi.afterClosed().subscribe(data =>
          //   {
          //     return
          //   })
          // })
        }
        else {
          dialogRef.close();
        }
      })
    }
  }

  onChangeEnd(event) {

  }
  cancle(){
    this.router.navigate(['/employee-management'])
  }
}
interface Experience {
  id: string,
  year: string
}
