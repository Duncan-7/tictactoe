import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  constructor() { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = true;
      return
    }
    this.error = false;

    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
  }
}
