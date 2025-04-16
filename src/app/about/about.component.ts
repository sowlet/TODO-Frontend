import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private router: Router) {}

  navigateToSignUp() {
    this.router.navigate(['/sign-in']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}