import { ProjectLinkService } from '../project-link.service';
import { EmployeeService } from '../employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesComponent } from './employees.component';
import { autoSpy } from 'autoSpy';
import {Employee} from '../employee';
import {of} from 'rxjs';

describe('EmployeesComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    // expect(c).toEqual
  });

  it('when onSearchClear is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.onSearchClear();
    // assert
    // expect(c).toEqual
  });

  it('when applyFilter is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.applyFilter();
    // assert
    // expect(c).toEqual
  });

  it('when getEmployees is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.getEmployees();
    // assert
    // expect(c).toEqual
  });

  it('when onEdit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.onEdit();
    // assert
    // expect(c).toEqual
  });

  it('when onCreate is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.onCreate();
    // assert
    // expect(c).toEqual
  });

  it('when onInitDialog is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.onInitDialog();
    // assert
    // expect(c).toEqual
  });

  it('when onDelete is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    // c.onDelete();
    // assert
    // expect(c).toEqual
  });


});

function setup() {
  const projectLink = autoSpy(ProjectLinkService);
  const service = autoSpy(EmployeeService);
  const dialog = autoSpy(MatDialog);
  const builder = {
    projectLink,
    service,
    dialog,
    default() {
      return builder;
    },
    build() {
      return new EmployeesComponent(projectLink, service, dialog);
    }
  };

  return builder;
}
