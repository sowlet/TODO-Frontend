import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../account.service'; // Import the AuthService

@Component({
  imports:[CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-in']);
  }

  onLogin() {
    const loginData = { username: this.username, password: this.password };
    // console.log('Login data:', loginData);

    this.authService.setCredentials(this.username, this.password); // Store credentials
    this.router.navigate(['/home']);

    // this.http.get('http://localhost:7000/shopping-list', { params: loginData }).subscribe(
    //   (response) => {
    //     console.log('Login successful:', response);
    //     this.authService.setCredentials(this.username, this.password); // Store credentials
    //     this.router.navigate(['/home']);
    //   },
    //   (error) => {
    //     console.error('Login failed:', error);
    //   }
    // );
  }
}