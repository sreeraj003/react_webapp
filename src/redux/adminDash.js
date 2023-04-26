import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[]
    },
    reducers:{
        setUsers:(state,action)=>{
            state.users = action.payload
        }
    }
})

export const {setUsers} = userSlice.actions

export default userSlice.reducer