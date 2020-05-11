import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ProjectLink} from './projectLink';
import {Project} from './project';
import {Employee} from './employee';

@Injectable({
  providedIn: 'root'
})
export class ProjectLinkService {

  projectLinksUrl = 'api/projectLink';  // URL to web api
  project: Project[];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /* GET projectLinks whose employeeId contains search employee */
  searchEmployeeIdProjectLinks(employee: Employee | number): Observable<ProjectLink[]> {
    const id = typeof employee === 'number' ? employee : employee.id;
    return this.http.get<ProjectLink[]>(`${this.projectLinksUrl}/?employeeId=${id}`).pipe(
      tap(x => x.length ?
        this.log(`found projectLinks matching "${id}"`) :
        this.log(`no projectLinks matching "${id}"`)),
      catchError(this.handleError<ProjectLink[]>('searchProjectLinks', []))
    );
  }

  /* GET projectLinks whose projectId contains search term */
  searchProjectIdProjectLinks(project: Project | number): Observable<ProjectLink[]> {
    const id = typeof project === 'number' ? project : project.id;
    return this.http.get<ProjectLink[]>(`${this.projectLinksUrl}/?projectId=${id}`).pipe(
      tap(x => x.length ?
        this.log(`found projectLinks matching "${id}"`) :
        this.log(`no projectLinks matching "${id}"`)),
      catchError(this.handleError<ProjectLink[]>('searchProjectLinks', []))
    );
  }

  //////// Save methods //////////
  /** POST: add a new projectLink to the server */
  addProjectLink(projectLink: ProjectLink): Observable<ProjectLink> {
    console.log(projectLink);
    return this.http.post<ProjectLink>(this.projectLinksUrl, projectLink, this.httpOptions).pipe(
      tap((newProjectLink: ProjectLink) => this.log(`added projectLink w/ id=${newProjectLink.id}`)),
      catchError(this.handleError<ProjectLink>('addProjectLink'))
    );
  }

  /** DELETE: delete the projectLink from the server */
  deleteProjectLink(projectLink: ProjectLink | number): Observable<ProjectLink[]> {
    const id = typeof projectLink === 'number' ? projectLink : projectLink.id;
    const url = `${this.projectLinksUrl}/${id}`;
    return this.http.delete<ProjectLink[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted projectLink id=${id}`)),
      catchError(this.handleError<ProjectLink[]>('deleteProjectLink'))
    );
  }

  /** PUT: update the projectLink on the server */
  updateProjectLink(projectLink: ProjectLink): Observable<any> {
    console.log(projectLink);

    return this.http.put(this.projectLinksUrl, projectLink, this.httpOptions).pipe(
      tap(_ => this.log(`updated projectLink id=${projectLink.id}`)),
      catchError(this.handleError<any>('updateProjectLink'))
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

  log(message: string) {
    console.log(`ProjectLinkService: ${message}`);
  }

}
