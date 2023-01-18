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
  isSuccess: false,
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

export const updateSoldVitamix = createAsyncThunk(
    'order/updateSoldVitamix', async(data, thunkAPI)=>{
       
       const {rejectWithValue} = thunkAPI
       try{
           const res = await OrderApi.UpdateUserSoldVitamix(data);
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
    reducers:{
        reset: (state) =>{
            state.order = null
            state.orders = []
            state.user_order = []
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
        }
    },
    extraReducers:{
        // ADD Order-------------------------------
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
        // Update user Solde vitamix--------------------------
        [updateSoldVitamix.pending]: (state, action) =>{
            state.isLoading = true
         },
         [updateSoldVitamix.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.isSuccess = true
         },
         [updateSoldVitamix.rejected]: (state, action) =>{
             state.isLoading = false
             state.isError = true
             state.message = action.payload
         },
         // Get One Order by Id -----------------------------------
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

         // Get One Order by Id ------------------------------
         [getOrderByUserID.pending]: (state, action) =>{
            state.isLoading = true
         },
         [getOrderByUserID.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.user_order = action.payload
         },
         [getOrderByUserID.rejected]: (state, action) =>{
             state.isLoading = false
             state.message = action.payload
         },
       
    }
})

export const { reset} = OrderSlice.actions
export default OrderSlice.reducer