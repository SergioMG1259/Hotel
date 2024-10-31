export interface Payment {
    id: number,
    reservation: string,
    totalAmount: number,
    startDate: Date,
    finalDate: Date,
    paymentDate: Date,
    paymentMethod: string
}