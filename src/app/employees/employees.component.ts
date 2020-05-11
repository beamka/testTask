import {Component, OnInit} from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {Employee} from '../employee';
import {ProjectLink} from '../projectLink';
import {EmployeeService} from '../employee.service';
import {EmployeeComponent} from '../employee/employee.component';
import {ProjectLinkService} from '../project-link.service';

@Component({
  selector: 'app-employees',
  styleUrls: ['./employees.component.css'],
  templateUrl: './employees.component.html',
})

export class EmployeesComponent implements OnInit {

  employees: Employee[];
  projectLinks: ProjectLink[];

  dataSource;
  searchKey: string;

  displayedColumns: string[] = ['id', 'surname', 'name', 'patronymic', 'actions'];

  constructor(private projectLink: ProjectLinkService,
              private service: EmployeeService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getEmployees(): void {
    this.service.getEmployees().subscribe(employees => this.dataSource = new MatTableDataSource(employees));
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getEmployees();
      this.onSearchClear();
    });

  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getEmployees();
      this.onSearchClear();
    });
  }

  onDelete(employee: Employee | number): void {

    if (confirm('Вы действительно хотите удалить данного сотрудника?')) {
      this.projectLink.searchEmployeeIdProjectLinks(employee).subscribe(res => {
        this.projectLinks = res;
        if (this.projectLinks.length > 0) {
          confirm('Сотрудника нельзя удалить, к нему прирвязаны проекты!');
        } else {
          this.service.deleteEmployee(employee).subscribe(() => {
            this.getEmployees();
            this.onSearchClear();
          });
        }
      });
    }
  }

}
