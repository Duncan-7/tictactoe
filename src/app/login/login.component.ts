import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  constructor(private authService: AuthService) { }

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
    this.authService.login(email, password);
  }
}
