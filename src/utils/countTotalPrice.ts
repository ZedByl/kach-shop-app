import { Card } from '../models/ICard'

type item = {
    price: number
    count: number
}

export function countTotalPrice(items: [Card]) {
    return items.reduce((acc: number, { price, count }: item) => acc + price * count, 0)
}
