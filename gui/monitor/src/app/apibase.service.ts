import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {

  private apiServer = {
    httpProtocol: "http",
    remoteServer: "127.0.0.1",
    remotePort: 3000,
  }

  private apiUrl = `${this.apiServer.httpProtocol}://${this.apiServer.remoteServer}:${this.apiServer.remotePort}/api`

  private paths = {
    developerRoot: '/Developers',
    taskRoot: '/Tasks'
  }

  private loginMethods = {
    login: '/login',
    logout: '/logout'
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  taskurl = this.apiUrl + this.paths.taskRoot

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation + " - " + error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
