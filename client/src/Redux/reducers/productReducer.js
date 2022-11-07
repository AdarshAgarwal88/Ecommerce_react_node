import { ActionType } from "../../components/constants";
const initialState ={
    products:[],
};
export const productReducer =(state = initialState, {type, payload}) =>{
  
    switch(type){
        case ActionType.SET_PRODUCTS:
            return  {...state,products: payload};
        default:
            return state;
    }
}

export const selectedProductReducer = (state={}, {type,payload})=> {
    switch(type){
        case ActionType.SELECTED_PRODUCT:
        return {...state, ...payload};
        default:
           return state;
    }
}