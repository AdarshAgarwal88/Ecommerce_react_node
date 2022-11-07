import React, { useEffect } from 'react';
import { Typography, Box, Grid, Card, CardActionArea, CardMedia, CardActions, Button, CardContent } from '@mui/material';
import image1 from "../assets/image/manShirt.jpg";
import image2 from "../assets/image/manshirt2.jpg";
import image3 from "../assets/image/manShirt3.jpg";
import image4 from "../assets/image/manShirt5.jpg";
import { height } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { setProduct } from '../Redux/actions/index'
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";

export default function ProductDiscription() {
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const response = await axios
            .get("http://fakestoreapi.com/products")
            .catch((err) => {
                console.log("Err", err);
            });
        if (response && response.data) {

            dispatch(setProduct(response.data));
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const products = useSelector((state) => state.allProducts.products);
    console.log(products)
    const id = products.id;

    return (
        <div>
            <Box>
                <Grid container direction='row'>
                    {products.map(product =>
                        <Grid item xs={12} lg={6} xl={3} xxl={3} >
                        <Link to={`/product/${product.id}`}>
                            <Card sx={{ maxWidth: 200, margin: "10px" }}>
                                <CardActionArea>
                                    <CardMedia
                                        className="cardImage"
                                        height={200}
                                        component="img"
                                        image={product.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <ReadMoreReact className="textdesign" text={product.title}
                                                min="20"
                                                ideal="20"
                                                max="40"
                                                readMoreText="...read more" />                                            
                                        </Typography>
                                        <Typography className="price" variant="body2" color="text.secondary">
                                            $ {product.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.category}
                                        </Typography>
                                        <Button className="buttonDesign" variant="contained" disableElevation>Add to cart</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    )
}
