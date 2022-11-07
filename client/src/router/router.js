import React from "react";
import { Routes, Route } from "react-router-dom";
import ListProduct from "../components/ListProduct";
import MainPage from "../components/mainPage";
import Product from "../components/Product";
import SignIn from "../components/SignIn";

export default function Router() {
  return (
    <>
      <Routes>
      {/* <Route path="/" element={<RedexExample />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
    </>
  );
}
