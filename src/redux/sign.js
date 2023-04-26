import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'signup',
  initialState: {
    name:'',
    age:'',
    email:'',
    password:''
  },
  reducers: {
    signupName: (state, action) => {
        console.log(action);
      state.name = action.payload
    },
    signupPassword:(state,action)=>{
        state.password = action.payload
    },
    signupAge:(state,action)=>{
        state.age = action.payload
    },
    signupEmail:(state,action)=>{
        state.email = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {signupName,signupPassword,signupAge,signupEmail} = counterSlice.actions

export default counterSlice.reducer