import { ServiceReservation } from "../../servicesRoom/models/serviceReservation";

export interface Reservation {
    id: number,
    customerName: string,
    roomNumber: string,
    startDate: Date,
    finalDate: Date,
    cost: number,
    status: string,
    services: ServiceReservation[]
}