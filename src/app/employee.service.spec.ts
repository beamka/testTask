import {HttpClient} from '@angular/common/http';
import {EmployeeService} from './employee.service';
import {Employee} from './employee';

//import {autoSpy} from './auto-spy';

describe('EmployeeService', () => {
  it('when initializeFormGroup is called it should', () => {
    // arrange

    const {build} = setup().default();
    const c = build();
    // act
    c.initializeFormGroup();
    // assert
    expect(c.form.valid).toBe(false);
  });

  it('when getEmployees is called it should', () => {
    // arrange
    const rows = [{id: 1, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'}];
    let employees: Employee[];
    employees = [{id: null, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'}];
    const {build} = setup().default();
    const c = build();
    // act
    c.getEmployees();
    // assert
    expect().toHaveBeenCalled(c.employeesUrl);
  });

  xit('when addEmployee is called it should', () => {
    // arrange
    let employees: Employee;
    const row = {id: null, surname: 'Тестовый', name: 'Тест', patronymic: 'Тестович', email: 'ff@otlook.com', city: 'Чернигов'};
    const {build} = setup().default();
    const c = build();
    // act
    c.addEmployee(row).subscribe(result => employees = result);
    console.log('employees', employees);
    // assert
    // expect(c).toEqual
  });

  xit('when deleteEmployee is called it should', () => {
    // arrange
    const {build} = setup().default();
    const c = build();
    // act
    // c.deleteEmployee();
    // assert
    // expect(c).toEqual
  });

  xit('when updateEmployee is called it should', () => {
    // arrange
    const {build} = setup().default();
    const c = build();
    // act
    // c.updateEmployee();
    // assert
    // expect(c).toEqual
  });

  xit('when handleError is called it should', () => {
    // arrange
    const {build} = setup().default();
    const c = build();
    // act
    c.handleError();
    // assert
    // expect(c).toEqual
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

  it('when log is called it should', () => {
    // arrange
    const {build} = setup().default();
    const c = build();
    // act
    c.log('test');
    expect(c).toBeDefined();
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
  //console.log('res', res);
  return res;
}
