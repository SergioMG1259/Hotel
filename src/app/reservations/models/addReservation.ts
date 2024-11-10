import { EntityForReservation } from "./entityForReservation";

export interface AddReservation {
    fechainicio: Date,
    fechafin: Date,
    cliente: EntityForReservation,
    habitacion: EntityForReservation
}