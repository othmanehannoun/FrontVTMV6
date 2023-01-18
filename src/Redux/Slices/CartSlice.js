import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { _id } = payload;
      
      const find = state.find((item) => item._id === _id);
      if (find) {
        return state.filter(cartItem => cartItem._id !== _id)
        // state.map((item) => 
        //   item._id === _id
        //     ? 
        //     {
        //         ...item,
        //         // quantity: item.quantity + 1
        //     }
        //     : item
        // );
      } else {
        state.push({
            
          ...payload,
             quantity: 1
        });
    
      }
    },

    increament(state, { payload }) {
        // console.log('PAAAY11', payload)
      return state.map((item) =>
        item._id === payload
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    },
   
    decrement(state, { payload }) {
        // console.log('PAAAY11', payload)
      return state.map((item) =>
        item._id === payload
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      );
    },

    clear(state) {
      return [];
    }
  }
});

export const { addToCart, increament, decrement, clear } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;