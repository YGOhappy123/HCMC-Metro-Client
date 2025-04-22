export const PAYMENT_METHOD_MAPPING = {
    cash: 'Tiền mặt',
    creditCard: 'Thẻ tín dụng',
    digitalWallet: 'Ví điện tử'
}

export const getMappedPaymentMethod = (status: string) => {
    return PAYMENT_METHOD_MAPPING[status as keyof typeof PAYMENT_METHOD_MAPPING] ?? 'Không xác định'
}

export const TICKET_STATUS_MAPPING = {
    unpaid: 'Chưa thanh toán',
    paid: 'Đã thanh toán',
    onboard: 'Đang sử dụng',
    used: 'Đã sử dụng'
}

export const getMappedTicketStatus = (status: string) => {
    return TICKET_STATUS_MAPPING[status as keyof typeof TICKET_STATUS_MAPPING] ?? 'Không xác định'
}

export const SALES_ORIGIN_MAPPING = {
    station: 'Mua trực tiếp tại ga',
    website: 'Mua online tại website'
}

export const getMappedSalesOrigin = (status: string) => {
    return SALES_ORIGIN_MAPPING[status as keyof typeof SALES_ORIGIN_MAPPING] ?? 'Không xác định'
}
