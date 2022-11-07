import { productReducer, selectedProductReducer } from "./productReducer";
import {combineReducers} from "redux";

const reducers = combineReducers({
    allProducts: productReducer,
    product: selectedProductReducer,
})

export default reducers;


