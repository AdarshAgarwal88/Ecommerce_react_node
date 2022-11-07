import { handleBreakpoints } from '@mui/system';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    let navigate = useNavigate();
    const handleDress = () => {
        navigate("/listProduct")
    }
    const handleHome = () => {
        navigate("/mainPage")
    }

    return (
        <div>
            <div class="navbar">
                <a href="#home" onClick={handleHome} >Home</a>

                <div class="dropdown">
                    <button class="dropbtn">Brands
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <div class="header">
                            <h2>Brand Menu</h2>
                        </div>
                        <div class="row">
                            <div class="column">
                                <h3>Popular brands</h3>
                                <a href="#">Utsa</a>
                                <a href="#">Forever 21</a>
                                <a href="#">LOV</a>
                                <a href="#">Biba</a>
                                <a href="#">Bombay Paisley</a>
                                <a href="#">Triumph</a>
                            </div>
                            <div class="column">
                                <h3>Featured brands</h3>
                                <a href="#">Westside</a>
                                <a href="#">Fabindia</a>
                                <a href="#">Adidas</a>
                                <a href="#">Kazo</a>
                                <a href="#">Aurelia</a>
                                <a href="#">Jaipur Kurti</a>
                            </div>
                            <div class="column">
                                <h3>Kids Fashion</h3>
                                <a href="#">Clovia</a>
                                <a href="#">Soch</a>
                                <a href="#">United Colors of Benetton</a>
                                <a href="#">Juniper</a>
                                <a href="#">Globus</a>
                                <a href="#">Enamor</a>
                            </div>



                        </div>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Categories
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <div class="header">
                            <h2>Mega Menu</h2>
                        </div>
                        <div class="row">
                            <div class="column">
                                <h3>Men's Fashion</h3>
                                <a href="#" onClick={handleDress} >Dresses</a>
                                <a href="#">Jeans</a>
                                <a href="#">Shirts</a>
                                <a href="#">Bags</a>
                                <a href="#">Shoes</a>
                                <a href="#">Shirts</a>
                            </div>
                            <div class="column">
                                <h3>Woman's Fashion</h3>
                                <a href="#">Formal Shirts</a>
                                <a href="#">Jeans</a>
                                <a href="#">Shirts</a>
                                <a href="#">Bags</a>
                                <a href="#">Shoes</a>
                                <a href="#">Shirts</a>
                            </div>
                            <div class="column">
                                <h3>Kids Fashion</h3>
                                <a href="#">Dresses</a>
                                <a href="#">Shirts</a>
                                <a href="#">Toys</a>
                                <a href="#">Bags</a>
                                <a href="#">Shoes</a>
                                <a href="#">Shirts</a>
                            </div>
                            <div class="column">
                                <h3>Home Furnishing</h3>
                                <a href="#">Bad Sheet</a>
                                <a href="#">Bad cover</a>
                                <a href="#">pillo</a>
                                <a href="#">Comfurter</a>
                                <a href="#">Door Mat</a>
                                <a href="#">Curtains</a>
                            </div>
                            <div class="column">
                                <h3>Jewellery Fashion</h3>
                                <a href="#">Earing</a>
                                <a href="#">Necklaces</a>
                                <a href="#">Rings</a>
                                <a href="#">Bangles</a>
                                <a href="#">Silver Jewellery</a>
                                <a href="#">Coins</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
