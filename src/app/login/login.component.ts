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
        }, 3000); // Hide message after 3 seconds
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