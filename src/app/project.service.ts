import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Project} from './project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsUrl = 'api/projects';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    projectName: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      projectName: ''
    });
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(tap(_ => this.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  //////// Save methods //////////
  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    console.log(project);
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );

  }

  /** DELETE: delete the project from the server */
  deleteProject(project: Project | number): Observable<Project[]> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete<Project[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project[]>('deleteProject'))
    );
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  populateForm(project) {
    this.form.setValue(_.omit(project, ''));
  }

  log(message: string) {
    console.log(`ProjectService: ${message}`);
  }
}
