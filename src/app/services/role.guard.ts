import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from './role.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);
  const router: Router = inject(Router);

  const requiredRoles: string[] = route.data['expectedRole'] || [];

  if (!Array.isArray(requiredRoles)) {
    console.error('ExpectedRoles is not an array or is missing');
    router.navigate(['/UnAuthorizedPage']);
    return false;
  }
  console.log('Route Data:', route.data);
  console.log('Required Roles:', requiredRoles);
  console.log('User Roles:', roleService.getUserRoles());

  const userHasRole = requiredRoles.some(role => roleService.hasRole(role));

  if (userHasRole) {
    return true;
  } else {
    router.navigate(['/UnAuthorizedPage']);
    return false;
  }
  
};
