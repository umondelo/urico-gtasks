import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'To-Do App (Using Google Tasks API) ';
  GoogleAuth = `${environment.googleApi.GOOGLE_AUTH_URL}`;
  validated: boolean = false;

  tasks=[];

  constructor(
    private http: Http,
    private appService: AppService,
  ) {

  }

  ngOnInit() {

    // Get token from the callback URL
    if(!localStorage.token || localStorage.token == undefined) {
      console.log('login required');
      this.validated = false;

    } else {
      // this.appService.validate();
      this.validated = true;
      this.appService.getAndStoreToken();
      this._validated();
      console.log('You are authorised! show token', this.appService.token);
    }

  }

  ngAfterViewInit() {

  }

  _validated() {

    this.http.get(`${environment.googleApi.GOOGLE_VALIDATE_TOKEN_URL}` + this.appService.token)
      .toPromise()
      .then((success) => {
        this.validated = true;
        console.log('success');
        // this.appService.getAndStoreToken();
        // return this.appService.getTasks()
        //   .subscribe(
        //     data => {
        //       this.tasks = data.json().items;
        //       console.log('Show Tasks', this.tasks);
        //     });
      }).catch((error) => {
        this.validated = false;
        console.log('error');
      })
  }

  getAuth() {
    this.appService.getAndStoreToken();
  }

  logout() {
    window.localStorage.removeItem('token');
    this.validated = false;
  }

}
