import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showError: boolean = false;
  showAuthMessage: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['authRequired']) {
        this.showAuthMessage = true;
        setTimeout(() => {
          this.showAuthMessage = false;
        }, 6000); // Hide message after 3 seconds
      }
    });
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-in']);
  }

  onLogin() {
    // Validate fields before making the request
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      this.showError = true;
      return;
    }

    // Validate username length and characters
    if (this.username.length < 3 || this.username.length > 20) {
      this.errorMessage = 'Username must be between 3 and 20 characters';
      this.showError = true;
      return;
    }

    // Validate password length and complexity
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      this.showError = true;
      return;
    }

    const url = `http://localhost:7070/sign-in?username=${this.username}&password=${this.password}`;
    
    this.http.get<boolean>(url).subscribe({
      next: (response) => {
        console.log(response)
        if (!response) {
          this.errorMessage = 'Login failed: Invalid credentials';
          this.showError = true;
          console.error(this.errorMessage);
        } else {
          this.authService.setCredentials(this.username, this.password);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed: ' + error.message;
        this.showError = true;
        console.error('Login failed:', error);
      }
    });
  }

  closeError() {
    this.showError = false;
  }
}