import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Employee} from './employee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesUrl = 'api/employees';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    surname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    city: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      surname: '',
      name: '',
      patronymic: '',
      email: '',
      city: ''
    });
  }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

  //////// Save methods //////////
  /** POST: add a new employees to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions);

  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee[]> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee[]>(url, this.httpOptions);
  }

  /** PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, this.httpOptions);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, ''));
  }

}
