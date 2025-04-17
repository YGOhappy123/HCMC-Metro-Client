declare global {
    type PaymentMethod = 'cash' | 'creditCard' | 'digitalWallet' | 'sfc'

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
        customerId?: number
        customer?: ICustomer
        issuedStationId?: number
        issuedStation?: IStation
        entryStationId: number
        entryStation?: IStation
        exitStationId: number
        exitStation?: IStation
        paymentMethod: PaymentMethod
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
        customerId: number
        customer?: ICustomer
        issuedStationId: number
        issuedStation?: IStation
        subscriptionTicketId: number
        subscriptionTicket?: ISubscriptionTicket
        paymentMethod: PaymentMethod
        price: number
        purchaseDate: string
        expiredAt: string
    }

    interface IIssuedSfcCard {
        sfcCardId: number
        code: string
        issuedStationId: number
        balance: number
        isActive: boolean
        issuedAt: string
    }
}

export {}
