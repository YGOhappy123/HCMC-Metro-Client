declare global {
    interface IUser {
        userId: number
        firstName: string
        lastName: string
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
        firstName: string
        lastName: string
        createdAt: string

        email?: string
        phoneNumber?: string
        avatar?: string
        isActive?: boolean
    }

    interface IStaff {
        staffId: number
        firstName: string
        lastName: string
        createdAt: string

        email: string
        phoneNumber: string
        avatar: string
        isActive?: boolean

        gender: 'Male' | 'Female'
        hireDate: string
        createdBy: Partial<IAdmin> | string
    }

    interface IAdmin {
        adminId: number
        firstName: string
        lastName: string
        createdAt: string

        email: string
        phoneNumber?: string
        avatar?: string
        isActive?: boolean

        gender: 'Male' | 'Female'
        createdBy?: Partial<IAdmin> | string
    }

    type IRole = 'Customer' | 'Staff' | 'Admin'
}

export {}
