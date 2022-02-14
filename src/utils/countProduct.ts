export const countProduct = (count: number) => {
    if (count === 1) {
        return `${count} товар`
    }
    if (count > 1 && count <= 4) {
        return `${count} товара`
    }
    return `${count} товаров`
}
