import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TrasferPointsApi from "../api/TrasferPonitsApi"

const initialState = {
  Beneficiary: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  isSuccess_b: false,
  message: null,
}

export const Trasfer_Point = createAsyncThunk(
 'trasfer/Trasfer_Point', async(data, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await TrasferPointsApi.TresferPoints(data);
        return res
    }
    catch(error){
        console.log(error)
        console.log(error.response.data)
        return rejectWithValue(error.response.data) 
    }
})

export const Get_Beneficiary = createAsyncThunk(
    'trasfer/Get_Beneficiary', async(id, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI
       try{
           const res = await TrasferPointsApi.getBeneficiary(id);
           
           return res
           
       }
       catch(error){
           console.log(error.response.data)
           return rejectWithValue(error.response.data) 
       }
})

export const AddNew_Beneficiary = createAsyncThunk(
    'trasfer/AddNew_Beneficiary', async(data, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI
       try{
           const res = await TrasferPointsApi.AddNewBeneficiary(data);

           return res
           
       }
       catch(error){
           console.log(error.response.data)
           return rejectWithValue(error.response.data) 
       }
})


const TransferSlice = createSlice({
    name : "trasfer",
    initialState,
    reducers:{
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
            state.isSuccess_b = false
        },
        
    },

    extraReducers:{
        
        [Trasfer_Point.pending]: (state, action) =>{
           state.isLoading = true
        },
        [Trasfer_Point.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
        },
        [Trasfer_Point.rejected]: (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },

        // Get Beneficiary By Id user
        [Get_Beneficiary.pending]: (state, action) =>{
            state.isLoading = true
         },
         [Get_Beneficiary.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.Beneficiary = action.payload
         },
         [Get_Beneficiary.rejected]: (state, action) =>{
             state.isLoading = false
             state.message = action.payload
         },

         // Add New Beneficiary
        [AddNew_Beneficiary.pending]: (state, action) =>{
            state.isLoading = true
         },
         [AddNew_Beneficiary.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.isSuccess_b = true
            
         },
         [AddNew_Beneficiary.rejected]: (state, action) =>{
             state.isLoading = false
             state.isError = true
             state.message = action.payload
         },
         
       
    }
})

export const { reset } = TransferSlice.actions
export default TransferSlice.reducer