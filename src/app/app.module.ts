import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { MaterialModule, MdCheckboxModule } from '@angular/material';
import { HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import 'hammerjs';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
