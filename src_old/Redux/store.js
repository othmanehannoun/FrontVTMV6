import { configureStore } from "@reduxjs/toolkit";
import category from "./Slices/ProviderSlice";
import user from './Slices/UserSlice'
import cartReducer from './Slices/CartSlice'
// import saladCartReducer from './Slices/SaladSlice'
import saladCart from './Slices/SaladSlice'
import order from './Slices/OrderSlice'
import transfer from './Slices/TransferSlice'



export default configureStore({
    reducer: {
        category,
        user,
        cart: cartReducer,
        // saladCart: saladCartReducer,
        saladCart,
        order,
        transfer
    }
})