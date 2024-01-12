import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === newItem.pizzaId);
            if (!existingItem) {
                state.cart.push(newItem);
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            }
        },
        deleletItem(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                state.cart = state.cart.filter(item => item.pizzaId !== pizzaId);
            }
        },
        increaseItemQuantity(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            }
        },
        decreaseItemQuantity(state, action) {
            const pizzaId = action.payload;
            const existingItem = state.cart.find(item => item.pizzaId === pizzaId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
                }
            }
        },
        clearCart(state, action) {
            state.cart = []
        }
    }
});

function calTotalPrice(state) {
    return state.cart.cart.reduce((totalPrice, item) => totalPrice + item.totalPrice, 0);
}

function calTotalQuantity(state) {
    return state.cart.cart.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
}

export const { addItem, deleletItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export { calTotalPrice, calTotalQuantity }
export default cartSlice.reducer;
