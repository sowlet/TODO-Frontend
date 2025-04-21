import { Component } from '@angular/core';
import { HotbarFComponent } from '../components/hotbar-f/hotbar-f.component';
import { AuthService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HotbarFComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToProfileCT() {
    this.router.navigate(['/profile-ct']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }
}
