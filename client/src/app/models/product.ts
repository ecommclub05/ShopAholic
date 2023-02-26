export interface Product {      // tell react what the product looks like
    id: number,
    name: string,
    description: string,
    pictureUrl: string,
    price: number,
    brand: string,
    type?: string,
    quantityInStock?: number
}
