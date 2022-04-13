import { Component, OnInit } from '@angular/core';
import { Title } from 'app/core/enum/title';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  title = Title.LEFT_LINK;
  experienceLevel: Experience[];
  generalInforForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
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

}
interface Experience {
  id: string,
  year: string
}
