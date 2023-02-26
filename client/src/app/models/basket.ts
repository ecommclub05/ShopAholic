export interface BasketItem {       // tell react what the basket item looks like
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface Basket {       // tell react what the basket looks like
    id: number;
    buyerId: string;
    items: BasketItem[];
}