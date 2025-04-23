export const SORT_MAPPING = {
    '-createdAt': [['createdAt', 'DESC']],
    '+createdAt': [['createdAt', 'ASC']],
    '-price': [['price', 'DESC']],
    '+price': [['price', 'ASC']],
    '-totalAmount': [['totalAmount', 'DESC']],
    '+totalAmount': [['totalAmount', 'ASC']],
    '-paymentTime': [['paymentTime', 'DESC']],
    '+paymentTime': [['paymentTime', 'ASC']],
    '-orderId': [['orderId', 'DESC']],
    '+orderId': [['orderId', 'ASC']],
    '-amount': [['amount', 'DESC']],
    '+amount': [['amount', 'ASC']],
    '-issuedAt': [['issuedAt', 'DESC']],
    '+issuedAt': [['issuedAt', 'ASC']],
    '-entryTime': [['entryTime', 'DESC']],
    '+entryTime': [['entryTime', 'ASC']],
    '-exitTime': [['exitTime', 'DESC']],
    '+exitTime': [['exitTime', 'ASC']]
}

export const getMappedSort = (sort: string) => {
    return SORT_MAPPING[sort as keyof typeof SORT_MAPPING] ?? []
}
