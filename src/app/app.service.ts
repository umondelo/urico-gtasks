import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  public token;
  public items;
  private params;
  validated: boolean = false;
  location: Location;
  constructor (
    private http: Http,
    location: Location
  ) {
    this.location = location;
    this.token = localStorage.getItem('token');
    this.params = {
      params: {
        access_token: this.token
      }
    };
  }

  getAndStoreToken() {
    //Check for callback URL
    if (this.location.path().indexOf("access_token") != -1) {
        localStorage.token = this.location.path().substring(this.location.path().indexOf("=") + 1, this.location.path().indexOf("&"));
        this.token = localStorage.token;
    }
  }

  validate() {
    return this.http.get(`${environment.googleApi.GOOGLE_VALIDATE_TOKEN_URL}` + this.token)
      .map((data) => {
          console.log('show data ', data, this.validated);
        }
      )
  }

  basePath = 'https://www.googleapis.com/tasks/v1';

  /**
  * Get task.
  * GET https://www.googleapis.com/tasks/v1/lists/tasklist/tasks/task
  */
  getTasks(): Observable<Response> {
    return this.http.get(this.basePath + '/lists/@default/tasks/', this.params)
    // return this.http.get(`${environment.googleApi.GOOGLE_TASK_API_URL}` + gToken)
  }

  /**
  * Create new task.
  * POST https://www.googleapis.com/tasks/v1/lists/tasklist/tasks
  */
  createTask(data): Observable<Response> {
    return this.http.post(this.basePath + '/lists/@default/tasks', data, this.params)
  }

  /**
  * Update Tasks
  * PUT https://www.googleapis.com/tasks/v1/lists/tasklist/tasks/task
  */
  clearTask(taskId): Observable<Response> {
    return this.http.post(this.basePath + '/lists/@default/clear', taskId, this.params)
  }

}
