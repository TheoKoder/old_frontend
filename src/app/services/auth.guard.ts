import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router:Router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    
    router.navigate(['/login']);
    return false;
  }
};
