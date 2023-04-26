import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name:'editUser',
    initialState:{
        userName : '',
        userAge:'',
        userEmail:''
    },
    reducers:{
        setUserName:(state,action)=>{
            state.userName = action.payload
        },
        setAge:(state,action)=>{
            state.userAge = action.payload
        },
        setEmail:(state,action)=>{
            state.userEmail = action.payload
        }
    }
})

export const {setUserName,setAge,setEmail} = userDataSlice.actions

export default userDataSlice.reducer  