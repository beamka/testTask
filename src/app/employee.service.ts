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
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  //////// Save methods //////////
  /** POST: add a new employees to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    console.log(employee);
    return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );

  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee[]> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee[]>('deleteEmployee'))
    );
  }

  /** PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<any> {
    console.log(employee);

    return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, ''));
  }

  log(message: string) {
    console.log(`EmployeeService: ${message}`);
  }
}
