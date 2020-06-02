import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {createCustomElement} from '@angular/elements';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';

import {MyNavComponent} from './my-nav/my-nav.component';
import {EmployeesComponent} from './employees/employees.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from './employee.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectService} from './project.service';
import {ProjectComponent} from './project/project.component';
import {ProjectLinkService} from './project-link.service';


@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    EmployeesComponent,
    EmployeeComponent,
    ProjectsComponent,
    ProjectComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService, ProjectService, ProjectLinkService],
  bootstrap: [AppComponent],
  entryComponents: [MyNavComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const custom = createCustomElement(MyNavComponent, {injector: this.injector});
    if (!window.customElements.get('app-my-nav')) {
      window.customElements.define('app-my-nav', custom);
    }
  }
}

