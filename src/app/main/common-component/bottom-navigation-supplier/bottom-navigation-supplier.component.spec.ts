import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationSupplierComponent } from './bottom-navigation-supplier.component';

describe('BottomNavigationSupplierComponent', () => {
  let component: BottomNavigationSupplierComponent;
  let fixture: ComponentFixture<BottomNavigationSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
