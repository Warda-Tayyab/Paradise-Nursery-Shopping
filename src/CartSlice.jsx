import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Extract plant details
      const existingItem = state.items.find(item => item.name === name); // Check if the item already exists in the cart
      if (existingItem) {
        existingItem.quantity++; // If it exists, increase its quantity
      } else {
        // If it doesn't exist, add the new item with a quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      // Filter out the item from the cart by matching its name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Reducer to update the quantity of a specific item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract the item name and new quantity
      const itemToUpdate = state.items.find(item => item.name === name); // Find the item in the cart
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update the quantity if the item is found
      }
    },
  },
});

// Export the action creators to use in the component files
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be used in the store.js file
export default CartSlice.reducer;
