import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

// sample data 
// {
//     _id,
//     title,
//      price,
// quantity
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (!item) {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
    }
  }
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
