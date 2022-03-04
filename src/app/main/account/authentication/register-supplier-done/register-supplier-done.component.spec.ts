import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplierDoneComponent } from './register-supplier-done.component';

describe('RegisterSupplierDoneComponent', () => {
  let component: RegisterSupplierDoneComponent;
  let fixture: ComponentFixture<RegisterSupplierDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSupplierDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSupplierDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
