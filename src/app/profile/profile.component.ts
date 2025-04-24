import { Component, OnInit } from '@angular/core';
import { HotbarFComponent } from '../components/hotbar-f/hotbar-f.component';
import { AuthService } from '../account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [HotbarFComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  major: string = '';
  minor: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    const url = `http://localhost:7070/profile?username=${this.username}`;
    
    this.http.get<string[]>(url).subscribe({
      next: (response) => {
        console.log('Profile info received:', response);
        this.major = response[1];
        this.minor = response[2];
      },
      error: (error) => {
        console.error('Failed to get profile info:', error);
      }
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }


  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  saveChanges() {
    // Implement save changes logic here, e.g., call a service to update the user's profile
    console.log('Major:', this.major);
    console.log('Minor:', this.minor);
    // call update
    // You would typically send this data to a backend service
  }
}
