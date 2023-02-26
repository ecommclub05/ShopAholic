import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {     // the catalog component
    const [products, setProducts] = useState<Product[]>([]);        // the products state
    const [loading, setLoading] = useState(true);            // the loading state

    useEffect(() => {               // on mount
        agent.Catalog.list()        // get the products
            .then(products => {     // set the products
                setProducts(products)    // set the products
            })
            .catch(error => console.log(error))     // log any errors
            .finally(() => setLoading(false));      // set loading to false
    }, [])                    // run this effect when the component mounts

    if (loading) return <LoadingComponent message="Loading products..." />      // if loading, return the loading component

    return (
        <>
            <ProductList products={products} />
        </>
    )
}