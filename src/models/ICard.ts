export interface Card {
    _id: string,
    image?: string,
    title: string,
    body?: string,
    type: string,
    price: number,
    count: number
}

export interface CardOrder {
    _id: string,
    userId?: string,
    name?: string,
    email?: string,
    phone?: string,
    number: number,
    date: number,
    totalPrice: number,
    pay: string,
    street: string,
    house?: string,
    entrance?: string,
    floor?: string,
    apartment?: string,
    intercom?: string,
    comment?: string,
    itemsProduct: Array<Card>,
}
