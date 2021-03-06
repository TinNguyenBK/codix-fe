import { Component, OnInit } from '@angular/core';
import { Title } from 'app/core/enum/title';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'app/main/common-component/dialog-confirm/dialog-confirm.component';
import { EmployeeManagementService } from 'app/core/service/employee-management.service';
import { CommonDialogComponent } from 'app/main/common-dialog/common-dialog.component';
import { CheckNullOrUndefinedOrEmpty } from 'app/core/utils/common-function';

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
  startingDate

  constructor(
    private formBuilder: FormBuilder, 
    private router : Router,
    public dialog: MatDialog,
    private employeeManagementService: EmployeeManagementService
  ) { }

  ngOnInit(): void {
    this.experienceLevel = [
      {id: '0', year: '0'},
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
            fullName: this.generalInforForm.get('fullName').value,
            experienceLevel: parseFloat(this.generalInforForm.get('level').value.id),
            startingDate: !CheckNullOrUndefinedOrEmpty(this.startingDate) ? this.startingDate : "2021-07-07T15:37:05.780Z",
            salary: parseFloat(this.generalInforForm.get('salary').value),
            vacationDays: parseFloat(this.generalInforForm.get('vacationDate').value),
            status: 'ACTIVE'
          }

          this.employeeManagementService.addEmployee(this.generalInfor).subscribe(response => {
            const dialogNotifi = this.dialog.open(CommonDialogComponent, {
              width: "500px",
              data: {
                message:'Add employee successfully!',
                title: "NOTIFICATION",
                colorButton: false
              },
            });
            dialogNotifi.afterClosed().subscribe(data =>
            {
              this.router.navigate(['/employee-management'])
            })
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
          })
        }
        else {
          dialogRef.close();
        }
      })
    }
  }

  onChangeTime(event) {
    this.startingDate =  event.toISOString()
  }
  cancle(){
    this.router.navigate(['/employee-management'])
  }
}
interface Experience {
  id: string,
  year: string
}
