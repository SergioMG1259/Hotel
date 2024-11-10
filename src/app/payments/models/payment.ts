import { Reservation } from "../../reservations/models/reservation";

export interface Payment {
    id: number,
    fechapago: Date,
    monto: number,
    metododepago:string,
    reserva: Reservation
}