import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from './apibase.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private apiService: ApiBaseService,
    private http: HttpClient) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation + " - " + error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks(): Observable<Task[]> {
    const url = this.apiService.taskurl
    console.log("url", url)

    return this.http.get<Task[]>(url).pipe(
      catchError(this.handleError<any>('getTasks', []))
    );
  }
}
