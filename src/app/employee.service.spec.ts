import {EmployeeService} from './employee.service';
import {TestBed} from '@angular/core/testing';
import {EMPLOYEES} from './mock-employee';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

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

describe('EmployeeService form', () => {

  it('when initializeFormGroup is called it should', () => {
    // arrange

    const {build} = setup().default();
    const c = build();
    // act
    c.initializeFormGroup();
    // assert
    expect(c.form.valid).toBe(false);
  });

  it('when populateForm is called it should', () => {
    // arrange
    const row = {id: 1, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'};
    const {build} = setup().default();
    const c = build();
    // act
    c.populateForm(row);
    // assert
    expect(c.form.valid).toBe(true);
  });

});

function setup() {
  const http = autoSpy(HttpClient);
  const builder = {
    http,
    default() {
      return builder;
    },
    build() {
      return new EmployeeService(http);
    }
  };

  return builder;
}

type SpyOf<T> = T & {
  [k in keyof T]: T[k] extends (...args: any[]) => infer R ? T[k] & jest.Mock<R> : T[k];
};

function autoSpy<T>(obj: new (...args: any[]) => T): SpyOf<T> {
  const res: SpyOf<T> = {} as any;

  // turns out that in target:es2015 the methods attached to the prototype are not enumerable so Object.keys returns []. So to workaround that and keep some backwards compatibility - merge with ownPropertyNames - that disregards the enumerable property.
  const keys = [...Object.keys(obj.prototype), ...Object.getOwnPropertyNames(obj.prototype)];
  keys.forEach(key => {
    res[key] = jest.fn();
  });
  return res;
}
