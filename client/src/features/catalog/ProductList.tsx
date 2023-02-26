import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {       // the props interface
    products: Product[];        
}

export default function ProductList({products}: Props) {        // the product list component
    return (        // return the grid
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}