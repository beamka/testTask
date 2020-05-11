import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNavComponent } from './my-nav/my-nav.component';
import {EmployeesComponent} from './employees/employees.component';
import {ProjectsComponent} from './projects/projects.component';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'my-nav', component: MyNavComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'projects', component: ProjectsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
