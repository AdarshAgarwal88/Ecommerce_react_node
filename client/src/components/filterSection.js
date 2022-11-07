import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import { useSelector, useDispatch } from 'react-redux'
import { setProduct } from '../Redux/actions/index';
import axios from "axios";
import { radioButtons, radioButtonsForCatogary } from './constants';
import { ColorLensOutlined } from '@mui/icons-material';

export default function FilterSection() {

    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();
    const fetchProducts = async (category) => {
        const isCategory = category !== 'products';
        const urlToAdd = isCategory ? `/category/${category}` : '';
        await axios
            .get(`https://fakestoreapi.com/products${urlToAdd}`)
            .then((response) => {
                if (response && response.data) {
                    dispatch(setProduct(response.data));
                }
            })
            .catch((err) => {
                console.log("Err", err);
            });
    }
    const sortMethod = () => {
       
        console.log("unsorted")
        console.log(products)
    
          products.sort(function (a,b){
            return a.price-b.price;            
          })
          console.log("sort")
          console.log(products)
          
          if(products){
            const items = products;
            dispatch(setProduct(items)); 
          }                  
    }
    return (
        <div>
            <Box container>
                <Grid>
                    <Grid items xs={12}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="span">
                                    Filters
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="span" sx={{ float: "right" }}>
                                    Clear
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid items xs={12}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardContent>
                                <FormLabel id="demo-radio-buttons-group-label">Sort by price</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel onClick={() => sortMethod()} value="Low" control={<Radio />} label="Low to High" />
                                    <FormControlLabel value="High" control={<Radio />} label="High to Low" />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid items xs={12}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardContent>
                                <FormLabel id="demo-radio-buttons-group-label">Size</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group">
                                    {radioButtons && radioButtons.map((ele) => {
                                        return (
                                            <FormControlLabel value={ele.value} control={<Radio />} label={ele.label} />
                                        )
                                    })}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid items xs={12}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardContent>
                                <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="products"
                                    name="radio-buttons-group">
                                    <FormControlLabel onClick={() => fetchProducts('products')} value="products" control={<Radio />} label="All" />
                                    <FormControlLabel onClick={() => fetchProducts('electronics')} value="electronics" control={<Radio />} label="electronics" />
                                    <FormControlLabel onChange={() => fetchProducts('jewelery')} value="jewelery" control={<Radio />} label="jewelery" />
                                    <FormControlLabel onChange={() => fetchProducts(`men's clothing`)} value="men's clothing" control={<Radio />} label="man" />
                                    <FormControlLabel onChange={() => fetchProducts(`women's clothing`)} value="women's clothing" control={<Radio />} label="woman" />
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
