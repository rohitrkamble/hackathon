import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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
}
