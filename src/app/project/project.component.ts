import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {ProjectService} from '../project.service';
import {Project} from '../project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(public service: ProjectService,
              public dialogRef: MatDialogRef<ProjectComponent>) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id').value) {
        this.service.addProject(this.service.form.value).subscribe();
      } else {
        this.service.updateProject(this.service.form.value).subscribe( resp => console.log(resp));
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
