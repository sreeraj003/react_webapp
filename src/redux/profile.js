import { createSlice } from "@reduxjs/toolkit";


export const profileSlice = createSlice({
    name:"profile",
    initialState:{
        data:'',
        image:[]
    },
    reducers:{
        setProfile:(state,action)=>{
            state.data = action.payload
        },
        setImage:(state,action)=>{
            state.image = action.payload
        }
    }

})

export const {setProfile,setImage} = profileSlice.actions

export default profileSlice.reducer