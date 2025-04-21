import { Component } from '@angular/core';
import { HotbarFComponent } from '../components/hotbar-f/hotbar-f.component';
import { AuthService } from '../account.service';
import { Router } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-profile-ct',
  imports: [HotbarFComponent, SearchComponent],
  templateUrl: './profile-ct.component.html',
  styleUrl: './profile-ct.component.css'
})
export class ProfileCtComponent {
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