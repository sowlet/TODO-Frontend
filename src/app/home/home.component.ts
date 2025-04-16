import { Component } from '@angular/core';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { AuthService } from '../account.service';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-home',
  imports: [HotbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.password = this.authService.getPassword();
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
