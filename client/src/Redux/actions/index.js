import {ActionType} from "../../components/constants"

export const setProduct =(products) =>{
    return{
        type: ActionType.SET_PRODUCTS,
        payload: products,
    }
}
export const selectedProduct =(products) =>{
    return{
        type: ActionType.SELECTED_PRODUCT,
        payload: products,
    }
}