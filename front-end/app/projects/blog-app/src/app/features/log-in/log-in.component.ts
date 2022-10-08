import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'blog-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];
  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit() {
    this.createForm();

    this.bodyTag.classList.add('login-page');
    this.htmlTag.classList.add('login-page');
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'user_name': ['', Validators.required],
      'user_password': ['', Validators.required],
    });
  }

  onSubmit(loginUser: LoginUser) {
    this.auth.login(loginUser).subscribe(user => console.log(user));
  }
}
