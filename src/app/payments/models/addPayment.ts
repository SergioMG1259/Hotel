import { ReservationToPay } from "./reservationToPay"

export interface AddPayment {
    reserva: ReservationToPay
    metododepago: string
}