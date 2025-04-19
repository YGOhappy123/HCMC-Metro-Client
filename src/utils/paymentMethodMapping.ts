const PAYMENT_METHOD_MAPPING = {
    cash: 'Tiền mặt',
    creditCard: 'Thẻ tín dụng',
    digitalWallet: 'Ví điện tử',
    sfc: 'Thẻ SFC'
}

const getMappedPaymentMethod = (status: string) => {
    return PAYMENT_METHOD_MAPPING[status as keyof typeof PAYMENT_METHOD_MAPPING] ?? 'Không xác định'
}

export { PAYMENT_METHOD_MAPPING, getMappedPaymentMethod }
