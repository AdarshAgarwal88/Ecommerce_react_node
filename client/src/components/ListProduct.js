import { Typography, Box, Grid, Card, Container } from '@mui/material';
import { typography } from '@mui/system';
import React from 'react';
import Header from "./header"
import FilterSection from "./filterSection"
import ProductDiscription from './ProductDiscription';

export default function ListProduct() {
    return (
        <div>
            <Header />
            <Container maxWidth="xl">
                <Box>
                    <Grid container>
                        <Grid items xs={12}>
                            <Typography className="heading" sx={{ marginTop: "30px", marginBottom: "30px", fontFamily: "fangsong", fontWeight: "700" }} variant="h3">Men's Fashion</Typography>
                        </Grid>
                        <Grid sx={{ marginLeft: "90px" }} items xs={12} lg={2} xl={2}>
                            <Card >
                                <FilterSection />
                            </Card>
                        </Grid>
                        <Grid sx={{ marginLeft: "40px" }} items xs={12} lg={8} xl={8}>
                            <Card>
                                <ProductDiscription />
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
