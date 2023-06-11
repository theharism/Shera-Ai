import { createSlice } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
    name:'points',
    initialState:{points:20},
    reducers:{
        addPoints:(state,action)=>{
            state.points += action.payload.value
        },
        subtractPoints:(state,action)=>{
            state.points -= action.payload.value
        },
        setPoints:(state,action)=>{
            state.points = action.payload.points;
        }
    }
})

export const {addPoints,subtractPoints,setPoints} = pointsSlice.actions;
export default pointsSlice.reducer;