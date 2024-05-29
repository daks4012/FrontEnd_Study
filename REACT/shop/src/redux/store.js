import { configureStore, createSlice } from '@reduxjs/toolkit'

let cartState = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        quantityMinus(state, action) {
            let nowId = state.findIndex((params) => params.id === action.payload);
            if (nowId !== -1 && state[nowId].quantity > 0) {
                state[nowId].quantity -= 1;
            }
        },
        quantityPlus(state, action) {
            let nowId = state.findIndex((params) => params.id === action.payload);
            if (nowId !== -1) {
                state[nowId].quantity += 1;
            }
        },
        addPerfume(state, action) {
            //name과 volume이 일치하는 항목을 찾는다. 일치하는 항목이 있다면 existingItemIndex는 그 항목의 인덱스를 갖음
            let existingItemIndex = state.findIndex((item) =>
                item.name === action.payload.name && item.volume === action.payload.volume
            ); //일치하는게 없다면 -1을 갖음
            if (existingItemIndex !== -1) { //일치하는 항목이 있다면 개수를 증가
                state[existingItemIndex].quantity += 1;
            } else {
                // 새로운 id를 현재 상태 배열의 길이에 따라 설정
                let newId = state.length + 1;
                state.push({ ...action.payload, id: newId });
            }
        },
        deletePerfume(state, action) {
            // 해당 id를 가진 아이템을 제거
            let filteredState = state.filter((item) => item.id !== action.payload);
            // 남은 아이템들의 id를 1부터 순차적으로 다시 할당
            return filteredState.map((item, index) => ({ ...item, id: index + 1 }));
        }
    }
})

export let { quantityPlus, quantityMinus, addPerfume, deletePerfume } = cartState.actions

export default configureStore({
    reducer: {
        cartState: cartState.reducer
    }
})
