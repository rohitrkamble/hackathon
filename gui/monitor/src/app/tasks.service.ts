import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from './apibase.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private apiService: ApiBaseService,
    private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    const url = this.apiService.taskurl

    return this.http.get<Task[]>(url).pipe(
      catchError(this.apiService.handleError<any>('getTasks', []))
    );
  }
}
