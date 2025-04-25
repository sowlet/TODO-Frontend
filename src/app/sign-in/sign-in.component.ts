import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { AuthService } from '../account.service'; // Import the AuthService

@Component({
  imports:[CommonModule, FormsModule],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';
  showError = false;
  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSignUp() {
    // Validate empty fields
    if (!this.username || !this.password || !this.email) {
        this.errorMessage = 'Please fill in all fields';
        this.showError = true;
        return;
    }

    // Validate username length and characters
    if (this.username.length < 3 || this.username.length > 20) {
        this.errorMessage = 'Username must be between 3 and 20 characters';
        this.showError = true;
        return;
    }

    // Validate password length
    if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long';
        this.showError = true;
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
        this.errorMessage = 'Please enter a valid email address';
        this.showError = true;
        return;
    }
    const url = `http://localhost:7070/sign-in?username=${this.username}&password=${this.password}&email=${this.email}`;
    
    this.http.post<boolean>(url, {}).subscribe({
      next: (response) => {
        if (response) {
          this.authService.setCredentials(this.username, this.password);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Sign up failed: Username already exists';
          this.showError = true;
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = 'Sign up failed: ' + error.message;
        this.showError = true;
        console.error('Sign up failed:', error);
      }
    });
  }

  closeError() {
    this.showError = false;
  }
}