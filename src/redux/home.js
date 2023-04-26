import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name:'home',
    initialState:{
        data:''
    },
    reducers:{
        setHomeData:(state,action)=>{
            state.data = action.payload
        }
    }
})

export const {setHomeData} = homeSlice.actions

export default homeSlice.reducer