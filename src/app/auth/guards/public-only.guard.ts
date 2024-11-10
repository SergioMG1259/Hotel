import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    // Redirige a la página de rooms si el usuario ya está logueado
    router.navigate(['/rooms']);
    return false;
  }

  return true; // Permite el acceso si no está logueado
};
