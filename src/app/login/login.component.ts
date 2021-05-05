import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  message: string;

  static alreadyLoggedIn = false;

  static readonly loginDetails = {
    "user1": "password1",
    "user2": "password2",
    "user3": "password3"
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.message = ''
    if(localStorage.getItem('user') !== null)
      this.router.navigate(["employees"])
  }

  login() {
    if (!this.username || !this.password) {
      this.message = 'All fields are mandatory!';
      return;
    }
    if (this.isValidLogin() === false) {
      this.message = 'Invalid credentials. Please try again!';
      return;
    }
    localStorage.setItem('user', this.username);
    this.router.navigate(["employees"]);
  }

  isValidLogin() {
    if (this.username in LoginComponent.loginDetails && LoginComponent.loginDetails[this.username] === this.password)
      return true;
    return false;
  }
}