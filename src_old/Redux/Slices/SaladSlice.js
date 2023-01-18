// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   Base : [],
//   Ingredient: []
// };

// const sladSlice = createSlice({
//   name: "saladCart",
//   initialState,
//   reducers: {
//      addToCart_1 (state, { payload }) {
//       const { _id } = payload;
      
//       const find = state.Base.find((item) => item._id === _id);
//       console.log(find);
//       if (find) {
//        //  state.Base.filter(cartItem => cartItem._id !== _id)
//         return console.log('eeee');;
    
//       } else {
//         state.Base.push({
    
//           ...payload,
//              quantity: 1
//         });
    
//       }
     
//     },

//     // addToCart_2(state, { payload }) {
//     //   const { _id } = payload;
      
//     //   const find = state.find((item) => item._id === _id);
//     //   if (find) {
//     //     return state.filter(cartItem => cartItem._id !== _id)
    
//     //   } else {
//     //     state.push({
            
//     //       ...payload,
//     //          quantity: 1
//     //     });
    
//     //   }
//     // },

//     // increament(state, { payload }) {
//     //     console.log('PAAAY11', payload)
//     //   return state.map((item) =>
//     //     item._id === payload
//     //       ? {
//     //           ...item,
//     //           quantity: item.quantity + 1
//     //         }
//     //       : item
//     //   );
//     // },
   
//     // decrement(state, { payload }) {
//     //     console.log('PAAAY11', payload)
//     //   return state.map((item) =>
//     //     item._id === payload
//     //       ? {
//     //           ...item,
//     //           quantity: item.quantity - 1
//     //         }
//     //       : item
//     //   );
//     // },

//     clear(state) {
//       return [];
//     }
//   }
// });

// export const { addToCart_1, clear } = sladSlice.actions;
// const saladCartReducer = sladSlice.reducer;

// export default saladCartReducer;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TrasferPointsApi from "../api/TrasferPonitsApi"

const initialState = {
  Base : [],
  Ingredient: []
};

export const addToCart_1 = createAsyncThunk(
 'saladCart/addToCart_1', async(item, thunkAPI)=>{
    // const {rejectWithValue} = thunkAPI
    try{
        // const res = await TrasferPointsApi.TresferPoints(data);
        return item
    }
    catch(error){
        // console.log(error)
        // console.log(error.response.data)
        return console.log(error) 
    }
})

export const addToCart_2 = createAsyncThunk(
  'saladCart/addToCart_2', async(item, thunkAPI)=>{
     // const {rejectWithValue} = thunkAPI
     try{
         return item
     }
     catch(error){
         return console.log(error) 
     }
 })


const saladCart = createSlice({
    name : "sladSlice",
    initialState,
    reducers:{
        reset: (state) =>{
          state.Base = [],
          state.Ingredient = []
        },
        
    },

    extraReducers:{
      
        [addToCart_1.fulfilled]: (state, action) =>{
          const { _id } = action.payload;
            
            const find = state.Base.find((item) => item._id === _id);
            if(find){
              state.Base = state.Base.filter(cartItem => cartItem._id !== _id)
            }
            else{
              state.Base = [action.payload, ...state.Base];
            }
            
        },

        [addToCart_2.fulfilled]: (state, action) =>{
          const { _id } = action.payload;
            
            const find = state.Ingredient.find((item) => item._id === _id);
            if(find){
              state.Ingredient = state.Ingredient.filter(cartItem => cartItem._id !== _id)
            }
            else{
              state.Ingredient = [action.payload, ...state.Ingredient];
            }
            
        },
       


    }
})

export const { reset } = saladCart.actions
export default saladCart.reducer
