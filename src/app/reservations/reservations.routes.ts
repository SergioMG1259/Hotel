import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { ReservationsListComponent } from "./pages/reservations-list/reservations-list.component";

export const reservationsRoutes: Routes = [
    {
        path: '',
        component: ReservationsListComponent
    }
]