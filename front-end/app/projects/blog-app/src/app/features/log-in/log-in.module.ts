import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LogInRoutingModule
  ]
})
export class LogInModule { }
