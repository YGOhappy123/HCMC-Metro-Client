declare global {
    type PaymentMethod = 'cash' | 'creditCard' | 'digitalWallet'

    type TicketStatus = 'unpaid' | 'paid' | 'onboard' | 'used'

    interface IOrder {
        orderId: number
        customerId?: number
        customer?: ICustomer
        total: number
        paymentTime?: string
        paymentMethod: PaymentMethod
        singleJourneyTickets?: IIssuedSingleJourneyTicket[]
        subscriptionTickets?: IIssuedSubscriptionTicket[]
    }

    interface ISingleJourneyTicketPrice {
        priceId: number
        firstStationId: number
        firstStation?: IStation
        secondStationId: number
        secondStation?: IStation
        paymentMethod: PaymentMethod
        price: number
        updatedAt: string
        updatedBy: number
        updatedByAdmin?: IAdmin
    }

    interface IIssuedSingleJourneyTicket {
        ticketId: number
        code: string
        orderId?: number
        order?: IOrder
        issuedStationId?: number
        issuedStation?: IStation
        entryStationId: number
        entryStation?: IStation
        exitStationId: number
        exitStation?: IStation
        paymentMethod?: PaymentMethod
        paymentTime?: string
        status: TicketStatus
        price: number
        purchaseDate: string
        expiredAt: string
    }

    interface ISubscriptionTicket {
        ticketId: number
        name: string
        requirements?: string
        validityDays: number
    }

    interface ISubscriptionTicketPrice {
        priceId: number
        subscriptionTicketId: number
        subscriptionTicket?: ISubscriptionTicket
        price: number
        updatedAt: string
        updatedBy: number
        updatedByAdmin?: IAdmin
    }

    interface IIssuedSubscriptionTicket {
        ticketId: number
        code: string
        orderId: number
        order?: IOrder
        issuedStationId: number
        issuedStation?: IStation
        subscriptionTicketId: number
        subscriptionTicket?: ISubscriptionTicket
        paymentMethod?: PaymentMethod
        paymentTime?: string
        status: TicketStatus
        price: number
        purchaseDate: string
        expiredAt: string
    }

    interface ITrip {
        ticketId: number
        singleJourneyTicketId?: number
        singleJourneyTicket?: IIssuedSingleJourneyTicket
        subscriptionTicketId?: number
        subscriptionTicket?: IIssuedSubscriptionTicket
        entryStationId: number
        entryStation?: IStation
        exitStationId: number
        exitStation?: IStation
        entryTime: string
        exitTime?: string
    }
}

export {}
