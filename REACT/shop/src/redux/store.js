import { configureStore, createSlice } from '@reduxjs/toolkit'

let cartState = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        quantityMinus(state, action) {
            let nowId = state.findIndex((prams) => { return prams.id === action.payload })
            state[nowId].quantity -= 1
        },
        quantityPlus(state, action) {
            let nowId = state.findIndex((prams) => { return prams.id === action.payload })
            state[nowId].quantity += 1
        },
        addPerfume(state, action) {
            state.push(action.payload)
        },
        deletePerfume(state, action) {
            return state.filter((item) => item.id !== action.payload);
        }
    }
})

export let { quantityPlus, quantityMinus, addPerfume, deletePerfume } = cartState.actions

export default configureStore({
    reducer: {
        cartState: cartState.reducer
    }
})