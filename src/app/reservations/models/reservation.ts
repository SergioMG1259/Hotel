import { ServiceReservation } from "../../servicesRoom/models/serviceReservation";
import { ShortCustomer } from "./shortCustomer";
import { ShortRoom } from "./shortRoom";

export interface Reservation {
    id: number,
    fechainicio: Date,
    fechafin: Date,
    estadoReserva: string,
    cliente: ShortCustomer,
    habitacion: ShortRoom,
    monto: number,
    createdAt: Date
    updatedAt: Date
}