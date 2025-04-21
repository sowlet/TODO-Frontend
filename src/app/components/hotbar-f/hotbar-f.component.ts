import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account.service'; // Import the AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotbar-f',
  imports: [CommonModule],
  templateUrl: './hotbar-f.component.html',
  styleUrl: './hotbar-f.component.css'
})
export class HotbarFComponent implements OnInit {
  username: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  profileClick() {
    // Add your profile click logic here
    console.log('Profile button clicked');
    this.router.navigate(['/schedule-editor']);
  }
}