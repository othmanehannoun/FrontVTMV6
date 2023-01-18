import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderApi from "../api/OrderApi"
// import AsyncStorage from "@react-native-async-storage/async-storage";

// Get user from localStorage

const initialState = {
  order: null,
  orders: [],
  user_order: [],
  isLoading: false,
  isError: false,
  message: null,
}

export const AddOrder = createAsyncThunk(
 'order/AddOrder', async(orderData, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await OrderApi.AddOrder(orderData);
        return res
    }
    catch(error){
        return rejectWithValue(error.response.data) 
    }
})

export const getOrder = createAsyncThunk(
    'order/getOrder', async(id, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI
       try{
           const res = await OrderApi.getOneOrder(id);
           return res
       }
       catch(error){
           return rejectWithValue(error.response.data) 
       }
})

export const getOrderByUserID = createAsyncThunk(
    'order/getOrderByUserID', async(id, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI
       try{
           const res = await OrderApi.getOrderByUser(id);
        //    console.log('SSSSS', res)
           return res
       }
       catch(error){
           return rejectWithValue(error.response.data) 
       }
})






const OrderSlice = createSlice({
    name : "order",
    initialState,
    // reducers:{
    //     reset: (state) =>{
    //         state.isLoading = false
    //         state.isError = false
    //         state.isSuccess = false
    //         state.message = null
    //     }
    // },
    extraReducers:{
        // ADD Order
        [AddOrder.pending]: (state, action) =>{
           state.isLoading = true
        },
        [AddOrder.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.order = action.payload
        },
        [AddOrder.rejected]: (state, action) =>{
            state.isLoading = false
            state.message = action.payload
        },
         // Get One Order by Id 
         [getOrder.pending]: (state, action) =>{
            state.isLoading = true
         },
         [getOrder.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.order = action.payload
         },
         [getOrder.rejected]: (state, action) =>{
             state.isLoading = false
             state.message = action.payload
         },

         // Get One Order by Id 
         [getOrderByUserID.pending]: (state, action) =>{
            state.isLoading = true
         },
         [getOrderByUserID.fulfilled]: (state, action) =>{
             state.isLoading = false
            //  console.log('action.payload', action.payload)
             state.user_order = action.payload
         },
         [getOrderByUserID.rejected]: (state, action) =>{
             state.isLoading = false
             state.message = action.payload
         },
       
    }
})

// export const { reset} = CategorySlice.actions
export default OrderSlice.reducer