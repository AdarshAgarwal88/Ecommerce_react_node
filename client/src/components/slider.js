import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import image1 from '../assets/image/sliderimage5.jpg'
import image2 from '../assets/image/sliderimage6.jpg'
import image3 from '../assets/image/sliderimage4.jpg'
function Item(props) {
    return (
        <Paper>
            <img className="imageIndex" width="1600" height="400" src={props.item.img}></img>
        </Paper >
    )
}
export default function slider(props) {
    var items = [
        { img: image1 },
        { img: image2 },
        { img: image3 },
    ]
    return (
        <>
            <Carousel>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>

        </>
    );
}
