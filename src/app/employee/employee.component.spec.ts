import { EmployeeService } from '../employee.service';
import { EmployeeComponent } from './employee.component';
import { autoSpy } from 'auto-Spy';
import {MatDialogRef} from '@angular/material/dialog';

describe('EmployeeComponent', () => {
  it('when ngOnInit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.ngOnInit();
    // assert
    expect(c).toHaveBeenCalled();
  });

  it('when onSubmit is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.onSubmit();
    // assert
    // expect(c).toEqual
  });

  it('when onClose is called it should', () => {
    // arrange
    const { build } = setup().default();
    const c = build();
    // act
    c.onClose();
    // assert
    // expect(c).toEqual
  });


});

function setup() {
  const service = autoSpy(EmployeeService);
  const dialogRef = autoSpy(MatDialogRef<EmployeeComponent>);
  const builder = {
    service,
dialogRef,
    default() {
      return builder;
    },
    build() {
      return new EmployeeComponent(service,dialogRef);
    }
  };

  return builder;
}
