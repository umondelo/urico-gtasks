import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'To-Do App (Using Google Tasks API) ';
  GoogleAuth = `${environment.googleApi.GOOGLE_AUTH_URL}`;
  GoogleLogout = `${environment.googleApi.GOOGLE_LOGOUT}`;
  validated: boolean = false;
  checked: boolean = false;
  tasks=[];

  constructor(
    private http: Http,
    private appService: AppService,
  ) {

    this.appService.getTasks()
      .map((response: Response) => {
        this.tasks = response.json().items;
        console.log('show task ', this.tasks);
      });
  }

  ngOnInit() {

    // Get token from the callback URL
    if(!localStorage.token || localStorage.token == undefined) {
      console.log('login required');
      this.validated = false;
      console.log(this.validated)
    } else {
      this.appService.validate();
      this.appService.getAndStoreToken();
      this.validated = true;
      console.log('You are authorised! show token', this.appService.token);
    }

    if(localStorage.token == null) {
      console.log('undefined');
      this.appService.getAndStoreToken();
    }

    //Check if token is validated
    this.appService.validate();

    // Load Default Tasks
    this.appService.getTasks()
      .subscribe(
        data => {
          this.tasks = data.json().items;
          console.log('Show Tasks', this.tasks);
        });
  }

  // Create new task on the default tasklist
  addTask(title: HTMLInputElement, event): boolean {
    let data = {
      title: title.value
    };

    // On enter key, save data
    if(event.keyCode == 13) {
      this.appService.createTask(data)
        .subscribe(
          (result) => {
            this.tasks.push(data);
            title.value = '';
          }
        );
        return false;
    }
  }

}
