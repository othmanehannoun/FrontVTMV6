import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProviderApi from "../api/ProviderApi"

export const getCatregory = createAsyncThunk(
'category/getCatregory', 
async(_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await ProviderApi.getCatregory();
        return res;
    }
    catch(error){
        return rejectWithValue(error.message);
    }
}) 

export const getSubCByCatregory = createAsyncThunk(
    'category/getSubCByCatregory', 

    async(id, thunkAPI)=>{
        // console.log("IIIID", id)
       const {rejectWithValue} = thunkAPI
       try{
           const res = await ProviderApi.getSubCByCategory(id);
           return res
       }
        catch(error){
            console.log("ERROR111", error.response.data)
            return rejectWithValue(error.response.data) 
        }

})


export const getProductByCatregory = createAsyncThunk(
    'category/getProductByCatregory', 
    async(id, thunkAPI)=>{

       const {rejectWithValue} = thunkAPI
       try{
           
           const res = await ProviderApi.getProductByCategory(id);
           // console.log('DATAHH', res);
           return res
       }
        catch(error){
            console.log("ERROR222", error.response.data)
            return rejectWithValue(error.response.data) 
        }
}) 

export const getProductBySubCatregory = createAsyncThunk(
    'category/getProductBySubCatregory', 
    async(id, thunkAPI)=>{

       const {rejectWithValue} = thunkAPI
       try{
           const res = await ProviderApi.getProductBySubCategory();
        //    console.log('DATAHH', res);
           return res
       }
        catch(error){
            console.log("ERROR333", error.response.data)
            return rejectWithValue(error.response.data) 
        }
}) 



const ProviderSlice = createSlice({
    name : "category",
    initialState: { 
        category: [],
        subCategory: [],
        products: [],
        subProducts: [],
        isLoading: false,
        error: null
    },
    extraReducers:{
        // Get Category ---------------------------
        [getCatregory.pending]: (state, action) =>{
           state.isLoading = true
        },
        [getCatregory.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.category = action.payload
        },
        [getCatregory.rejected]: (state, action) =>{
            state.isLoading = false
            state.error = action.payload
        },

        // Get SubCatgory By Category ------------------
         [getSubCByCatregory.pending]: (state, action) =>{
            state.isLoading = true
         },
         [getSubCByCatregory.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.subCategory = action.payload
         },
         [getSubCByCatregory.rejected]: (state, action) =>{
             state.isLoading = false
             // state.error = action.payload
         },

         // Get Products By Category ------------------
         [getProductByCatregory.pending]: (state, action) =>{
            state.isLoading = true
         },
         [getProductByCatregory.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.products = action.payload
         },
         [getProductByCatregory.rejected]: (state, action) =>{
             state.isLoading = false
             // state.error = action.payload
         },

         // Get Products By Sub Category ------------------
         [getProductBySubCatregory.pending]: (state, action) =>{
             
            state.isLoading = true
         },
         [getProductBySubCatregory.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.subProducts = action.payload
         },
         [getProductBySubCatregory.rejected]: (state, action) =>{
             state.isLoading = false
             // state.error = action.payload
         }

    }
})


export default ProviderSlice.reducer