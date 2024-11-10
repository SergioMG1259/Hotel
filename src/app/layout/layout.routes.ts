import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { loggedInGuard } from "../auth/guards/logged-in.guard";

export const layoutRoutes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'rooms',
          loadComponent: () => import('../rooms/pages/rooms-list/rooms-list.component').then(m => m.RoomsListComponent),
          canActivate: [loggedInGuard]
        },
        {
          path: 'services',
          loadComponent: () => import('../servicesRoom/pages/services-room-list/services-room-list.component')
            .then(m => m.ServicesRoomListComponent),
          canActivate: [loggedInGuard]
        },
        {
          path:'reservations',
          loadComponent: () => import('../reservations/pages/reservations-list/reservations-list.component')
            .then(m => m.ReservationsListComponent),
            canActivate: [loggedInGuard]
        },
        {
          path:'payments',
          loadComponent: () => import('../payments/pages/payments-list/payments-list.component')
            .then(m => m.PaymentsListComponent),
            canActivate: [loggedInGuard]
        },
        {
          path:'profile',
          loadComponent: () => import('../profile/pages/profile/profile.component')
          .then(m => m.ProfileComponent),
          canActivate: [loggedInGuard]
        }
      ],
    },
];