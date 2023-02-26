import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";

interface Props {       // the props interface
    product: Product;       // the product
}

export default function ProductCard({ product }: Props) {       // the product card component
    const [loading, setLoading] = useState(false);              // the loading state
    const {setBasket} = useStoreContext();                // get the setBasket function from the context

    function handleAddItem(productId: number, quantity = 1) {     // handle add item
        setLoading(true);                                   // set the loading state to true
        agent.Basket.addItem(productId, quantity)           // add the item to the basket
            .then(basket => setBasket(basket))              // set the basket
            .catch(error => console.log(error))             // log any errors
            .finally(() => setLoading(false))               // set the loading state to false
    };
    
    return (        
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'primary.dark' }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: '#E6DBB9' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.id)} 
                    size="small">Add to Cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`}  size="small">View</Button>
            </CardActions>
        </Card>
    )
}