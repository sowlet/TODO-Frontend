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

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSignUp() {
    const signUpData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.setCredentials(this.username, this.password); // Store credentials
    this.router.navigate(['/home']);
    
    // this.http.post('/server/signup', signUpData).subscribe(
    //   (response) => {
    //     console.log('Sign up successful:', response);
    //     this.router.navigate(['/home']);
    //   },
    //   (error) => {
    //     console.error('Sign up failed:', error);
    //   }
    // );
  }
}