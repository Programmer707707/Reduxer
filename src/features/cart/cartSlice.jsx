import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from 'axios';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

//We used Thunk for data fetching
export const getCartItems = createAsyncThunk('cart/getCartItems', async ()=>{       // Purpose of this method is just fetching //the url and getting the data // and replacing it with dynamic array
    try{
        const resp = await axios.get(url);
        const data = resp.data;
        return data;
    }   
    catch(error){
        console.log(error);
    }
});                                                                            


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0;
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.filter((item) => item.id === id);
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
            
            state.amount -= item[0].amount;
        },
        incAmount: (state, action) => {
            const id = action.payload
            const product = state.cartItems.filter(item => item.id === id);
            product[0].amount += 1;
            state.amount += 1;
        },
        decAmount: (state, action) => {
            const id = action.payload
            const product = state.cartItems.filter(item => item.id === id);
            if(product[0].amount >= 1){
                product[0].amount -= 1;
            }
            state.amount -= 1;
        },
        calcTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item)=> {
                amount += item.amount;
                total += item.amount * item.price;
            })

            state.amount = amount;
            state.total =  total;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getCartItems.pending, state => {
            state.isLoading = true;
        }).addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
        }).addCase(getCartItems.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

//console.log(cartSlice);
export const {clearCart, removeItem, incAmount, decAmount, calcTotal} =  cartSlice.actions;
export default cartSlice.reducer;