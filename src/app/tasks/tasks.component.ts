import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { AppService } from '../app.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  tasks=[];
  checked: boolean = false;
  validated: boolean = false;
  constructor(
    private http: Http,
    private appService: AppService,
  ) {

  }

  ngAfterViewInit() {
    if(this.validated) {
      return this.appService.getTasks()
        .subscribe(
          data => {
            this.tasks = data.json().items;
            console.log('Show Tasks', this.tasks);
          });
    }
  }

  ngOnInit() {
    // this.appService.getAndStoreToken();
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
