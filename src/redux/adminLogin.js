import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name : 'adminLogin',
    initialState:{
        email:'',
        password:''
    },
    reducers:{
        setEmail:(state,action)=>{
            state.email = action.payload
        },
        setPassword:(state,action)=>{
            state.password = action.payload
        }
    }
})

export const {setEmail,setPassword} =adminSlice.actions

export default adminSlice.reducer