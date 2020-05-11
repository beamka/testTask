import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {Project} from '../project';
import {ProjectService} from '../project.service';
import {ProjectComponent} from '../project/project.component';
import {EmployeeComponent} from '../employee/employee.component';
import {ProjectLink} from '../projectLink';
import {ProjectLinkService} from '../project-link.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  dataSource;
  searchKey: string;
  test: boolean;
  projectLinks: ProjectLink[];

  displayedColumns: string[] = ['id', 'projectName', 'actions'];

  constructor(private service: ProjectService,
              private projectLink: ProjectLinkService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProjects();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  getProjects(): void {
    this.service.getProjects().subscribe(projects => {
      this.dataSource = new MatTableDataSource(projects);
      console.log(projects);
    });
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProjectComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getProjects();
      this.onSearchClear();
    });
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ProjectComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getProjects();
      this.onSearchClear();
    });
  }

  onDelete(project: Project | number): void {

    if (confirm('Вы действительно хотите удалить данный проект?')) {
      this.projectLink.searchProjectIdProjectLinks(project).subscribe(res => {
          this.projectLinks = res;
          if (this.projectLinks.length > 0) {
            confirm('Проект нельзя удалить, к проекту привязаны сотрудники!');
          } else {
            this.service.deleteProject(project).subscribe(() => {
              this.getProjects();
              this.onSearchClear();
            });
          }
        }
      );
    }
  }

}
