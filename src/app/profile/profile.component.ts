import { Component } from '@angular/core';
import { HotbarFComponent } from '../components/hotbar-f/hotbar-f.component';
import { AuthService } from '../account.service';

@Component({
  selector: 'app-profile',
  imports: [HotbarFComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }
}
