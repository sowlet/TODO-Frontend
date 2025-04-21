import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameKey = 'username';
  private passwordKey = 'password';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.username = localStorage.getItem(this.usernameKey) || '';
      this.password = localStorage.getItem(this.passwordKey) || '';
    } else {
      this.username = '';
      this.password = '';
    }
  }

  private username: string = '';
  private password: string = '';

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.passwordKey, password);
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  clearCredentials(): void {
    this.username = '';
    this.password = '';
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.passwordKey);
  }
}