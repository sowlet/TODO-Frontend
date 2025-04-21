import { Component } from '@angular/core';
import { HotbarComponent } from '../components/hotbar/hotbar.component';
import { AuthService } from '../account.service';
import { CommonModule } from '@angular/common';
import { HotbarFComponent } from "../components/hotbar-f/hotbar-f.component";

@Component({

  selector: 'app-home',
  imports: [HotbarComponent, CommonModule, HotbarFComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // example of accessing username and password from AuthService
  // This is just for demonstration purposes. In a real application, you would not log sensitive information like passwords.
  // ngOnInit(): void {
  //   this.username = this.authService.getUsername();
  //   this.password = this.authService.getPassword();
  //   console.log('Username:', this.username);
  //   console.log('Password:', this.password);
  // }
}
