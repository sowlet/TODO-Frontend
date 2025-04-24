import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accountService = inject(AccountService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.accountService.getUsername()) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { authRequired: true }
    });
    return false;
  }
}

export const authGuard = () => {
  const auth = inject(AuthService);
  return auth.canActivate();
};