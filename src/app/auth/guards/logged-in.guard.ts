import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // Redirige a login si no está logueado
    router.navigate(['/login']);
    return false;
  }

  return true; // Permite el acceso si está logueado
};
