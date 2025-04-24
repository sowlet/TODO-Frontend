import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './account.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUsername()) {
    return true;
  }

  // Redirect to login if not authenticated
  router.navigate(['/login']);
  return false;
};