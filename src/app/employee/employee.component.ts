import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(public service: EmployeeService,
              public dialogRef: MatDialogRef<EmployeeComponent>) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id').value) {
        this.service.addEmployee(this.service.form.value).subscribe();
      } else {
        this.service.updateEmployee(this.service.form.value).subscribe( resp => console.log(resp));
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.ngOnInit();
    this.dialogRef.close();
  }

}
