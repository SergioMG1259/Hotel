import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";

export const layoutRoutes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'rooms',
          loadComponent: () => import('../rooms/pages/rooms-list/rooms-list.component').then(m => m.RoomsListComponent),
        },
        {
          path: 'services',
          loadComponent: () => import('../servicesRoom/pages/services-room-list/services-room-list.component')
            .then(m => m.ServicesRoomListComponent),
        },
        {
          path:'reservations',
          loadComponent: () => import('../reservations/pages/reservations-list/reservations-list.component')
            .then(m => m.ReservationsListComponent)
        },
        {
          path:'payments',
          loadComponent: () => import('../payments/pages/payments-list/payments-list.component')
            .then(m => m.PaymentsListComponent)
        }
      ],
    },
];