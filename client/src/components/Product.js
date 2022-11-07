import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct } from '../Redux/actions/index'
import Header from './header';
import { Container, Typography, Box, Grid, Card, CardActionArea, CardMedia, CardActions, Button, CardContent } from '@mui/material';


export default function Product() {

  const product = useSelector((state) => state.product);
  const id = useParams();
  const dispatch = useDispatch();
  console.log("Product:- "+product);
  const fetchProductsDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id.id}`)
      .catch((err) => {
        console.log("Err", err)
      });
    dispatch(selectedProduct(response.data));

  }
  useEffect(() => {
    fetchProductsDetail();
  }, []);
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Box>
          <Grid container>
            <Grid sx={{}} items xs={6} lg={6} xl={6}>
              <CardMedia
                className="productImage"               
                component="img"
                image={product.image}
                alt="green iguana"
              />
            </Grid>
            <Grid sx={{}} items xs={6} lg={6} xl={6}>
              <Typography variant='h4'>Man Clothing</Typography>
              <Typography variant='body1'>Nuon by Westside Charcoal Nuo-Flex Rodeo Carrot Fit Jeans</Typography>
              <Typography variant='h4'>MRP:- $16</Typography>
              <Typography variant='body1'>including all taxe</Typography>
              <Typography variant='body1'>Select Size</Typography>              
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
