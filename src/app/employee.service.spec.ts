import {EmployeeService} from './employee.service';
import {TestBed} from '@angular/core/testing';
import {EMPLOYEES} from './mock-employee';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('EmployeeService http', () => {

  let http: HttpTestingController;
  let employeeService: EmployeeService;

  const expectedData = EMPLOYEES;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [EmployeeService]
    });

    employeeService = TestBed.inject(EmployeeService);
    http = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(employeeService).toBeTruthy();
  });

  it('should have made one request to GET data from expected URL', () => {

    employeeService.getEmployees().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = http.expectOne(employeeService.employeesUrl);
    expect(req.request.method).toEqual('GET');

  });

  it('should have made one request to POST data from expected URL', () => {
    const row = {id: null, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'};

    employeeService.addEmployee(row).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = http.expectOne(employeeService.employeesUrl);
    expect(req.request.method).toEqual('POST');

  });

  it('should have made one request to PUT data from expected URL', () => {
    const row = {id: 1, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'};

    employeeService.updateEmployee(row).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = http.expectOne(employeeService.employeesUrl);
    expect(req.request.method).toEqual('PUT');

  });

  it('should have made one request to DELETE data from expected URL', () => {
    const row = {id: 1, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'};
    const id = 1;
    employeeService.deleteEmployee(1).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
    const url = `${employeeService.employeesUrl}/${id}`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('DELETE');

  });

});
