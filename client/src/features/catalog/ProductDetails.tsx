import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails() {                                          // the product details component
    const { basket, setBasket, removeItem } = useStoreContext();            // get the basket, setBasket and removeItem functions from the context
    const { id } = useParams<{ id: string }>();                             // get the id from the url
    const [product, setProduct] = useState<Product | null>(null);           // set the product state
    const [loading, setLoading] = useState(true);                           // set the loading state
    const [quantity, setQuantity] = useState(0);                             // set the quantity state
    const [submitting, setSubmitting] = useState(false);                    // set the submitting state
    const item = basket?.items.find(i => i.productId === product?.id);      // find the item in the basket

    useEffect(() => {       
        if (item) setQuantity(item.quantity);                        // if the item is in the basket, set the quantity to the item quantity
        id && agent.Catalog.details(parseInt(id))                   // if the id is in the url, get the product details
            .then(response => setProduct(response))                 // set the product
            .catch(error => console.log(error))                      // log any errors
            .finally(() => setLoading(false))                // set the loading state to false
    }, [id, item]);

    function handleInputChange(e: any) {                     // handle input change
        if (e.target.value >= 0)                        // if the value is greater than or equal to 0
            setQuantity(parseInt(e.target.value));      // set the quantity to the value
    }                                           

    function handleUpdateCart() {                    // handle update cart
        setSubmitting(true);                        // set the submitting state to true
        if (!item || quantity > item?.quantity) {                                   // if the item is not in the basket or the quantity is greater than the item quantity
            const updatedQuantity = item ? quantity - item.quantity : quantity;     // set the updated quantity to the quantity minus the item quantity
            agent.Basket.addItem(product?.id!, updatedQuantity)                     // add the item to the basket
                .then(basket => setBasket(basket))                                  // set the basket
                .catch(error => console.log(error))                                 // log any errors
                .finally(() => setSubmitting(false));                               // set the submitting state to false
        } else {                                                                // if the item is in the basket and the quantity is less than the item quantity
            const updatedQuantity = item.quantity - quantity;               // set the updated quantity to the item quantity minus the quantity
            agent.Basket.removeItem(product?.id!, updatedQuantity)              // remove the item from the basket
                .then(() => removeItem(product?.id!, updatedQuantity))      // remove the item from the basket
                .catch(error => console.log(error))                    // log any errors
                .finally(() => setSubmitting(false));           // set the submitting state to false
        }
    }

    if (loading) return <LoadingComponent message="Loading product..." />       // if loading, return the loading component

    if (!product) return <NotFound />                                    // if the product is null, return the not found component

    return (                                                // return the product details
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>₹{(product.price / 10).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant={'outlined'}
                            type={'number'}
                            label={'Quantity in Cart'}
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={submitting}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color={'primary'}
                            size={'large'}
                            variant={'contained'}
                            fullWidth>
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}