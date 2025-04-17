declare global {
    interface IUser {
        userId: number
        fullName: string
        role: IRole
        createdAt: string

        email?: string
        phoneNumber?: string
        avatar?: string
        isActive?: boolean

        gender?: 'Male' | 'Female'
        hireDate?: string
        createdBy?: Partial<IAdmin> | string
    }

    interface ICustomer {
        customerId: number
        fullName: string
        createdAt: string

        singleJourneyTickets?: IIssuedSingleJourneyTicket[]
        subscriptionTickets?: IIssuedSubscriptionTicket[]

        email?: string
        phoneNumber?: string
        avatar?: string
        isActive?: boolean
    }

    interface IStaff {
        staffId: number
        fullName: string
        createdAt: string

        email: string
        phoneNumber: string
        avatar: string
        isActive?: boolean

        hireDate: string
        workingStationId: number
        workingStation?: Partial<IStation>
        createdBy: number
        createdByAdmin?: Partial<IAdmin> | string
    }

    interface IAdmin {
        adminId: number
        fullName: string
        lastName: string
        createdAt: string

        email: string
        phoneNumber?: string
        avatar?: string
        isActive?: boolean

        createdBy?: number
        createdByAdmin?: Partial<IAdmin> | string
    }

    type IRole = 'customer' | 'staff' | 'admin'
}

export {}
