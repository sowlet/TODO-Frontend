import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  imports:[CommonModule, FormsModule, AppComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-in']);
  }

  onLogin() {
    const loginData = { username: this.username, password: this.password };
    // console.log('Login data:', loginData);
    this.http.get('/server/login', { params: loginData }).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}