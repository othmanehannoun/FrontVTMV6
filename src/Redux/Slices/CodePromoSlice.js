import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CodePromoApi from "../api/CodePromoApi"
// import AsyncStorage from "@react-native-async-storage/async-storage";

// Get user from localStorage

const initialState = {
  data: null,
  isLoadingCode: false,
  isSuccess: false,
  isError: false,
  message: null,
}
export const CheckPromoCodeIsValid = createAsyncThunk(
 'order/CheckPromoCodeIsValid', async(code, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await CodePromoApi.CheckPromoCodeIsValid(code);
        return res
    }
    catch(error){
        // console.log("AAA", error.response.data);
        return rejectWithValue(error.response.data) 
    }
})

const CodePromoSlice = createSlice({
    name : "order",
    initialState,
    reducers:{
          reset: (state) =>{
              state.isLoadingCode = false
              state.isError = false
              state.isSuccess = false
              state.message = null
          }
      },
    extraReducers:{
        // ADD Order
        [CheckPromoCodeIsValid.pending]: (state, action) =>{
           state.isLoadingCode = true
        },
        [CheckPromoCodeIsValid.fulfilled]: (state, action) =>{
            state.isLoadingCode = false
            state.isSuccess = true
            state.data = action.payload
        },
        [CheckPromoCodeIsValid.rejected]: (state, action) =>{
            state.isLoadingCode = false
            state.isError = true
            state.message = action.payload
        },
        
       
    }
})

export const { reset } = CodePromoSlice.actions
export default CodePromoSlice.reducer