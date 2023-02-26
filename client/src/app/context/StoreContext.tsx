import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {       // interface for the context value
    removeItem: (productId: number, quantity: number) => void;      // function to remove an item from the basket
    setBasket: (basket: Basket) => void;                   // function to set the basket
    basket: Basket | null;                            // the basket
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);        // create the context

export function useStoreContext() {     // custom hook to use the context
    let context = useContext(StoreContext);     // get the context

    if (context === undefined) {        // if the context is undefined, throw an error
        throw Error('Oops - we do not seem to be inside the provider');     // throw an error
    }

    return context;     // return the context
}

export function StoreProvider({children}: PropsWithChildren<any>) {     // the provider component
    const [basket, setBasket] = useState<Basket | null>(null);      // the basket state

    function removeItem(productId: number, quantity: number) {      // function to remove an item from the basket
        if (!basket) return;                                        // if the basket is null, return
        const items = [...basket.items];                    // new array of items
        const itemIndex = items.findIndex(i => i.productId === productId);    // find the index of the item
        if (itemIndex >= 0) {                                           // if the item exists
            items[itemIndex].quantity -= quantity;                // decrease the quantity
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);        // if the quantity is 0, remove the item
            setBasket(prevState => {        // set the basket
                return {...prevState!, items}       // return the new basket
            })
        }
    }

    return (        
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}      
        </StoreContext.Provider>
    )
}