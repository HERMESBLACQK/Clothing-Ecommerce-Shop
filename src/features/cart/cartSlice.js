import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Product removed from the cart!');
        },
        updateCartAmount: (state, action) => {
            const { id, amount } = action.payload;
            const cartItem = state.cartItems.find(item => item.id === id);
            if (cartItem) {
                cartItem.amount += amount; // Increment or decrement based on payload
                if (cartItem.amount <= 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                }
                cartSlice.caseReducers.calculateTotals(state);
            }
        },
        updateCartItemSize: (state, action) => {
            const { id, newSize } = action.payload;
            const cartItem = state.cartItems.find(item => item.id === id);
            if (cartItem) {
                cartItem.selectedSize = newSize;
            }
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
        addToCart: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload.id);
            if (!cartItem) {
                state.cartItems.push(action.payload);
            } else {
                cartItem.amount += action.payload.amount;
            }
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Product added to the cart!');
        }
    }
});

export const { clearCart, removeItem, updateCartAmount, updateCartItemSize, calculateTotals, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
