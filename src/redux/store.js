import { configureStore } from '@reduxjs/toolkit'
import sighnupReducer from './sign'
import profileReducer from './profile'
import homeReducer from './home'
import userReducer from './adminDash'
import adminLoginReducer from './adminLogin'
import userDataReducer from './userData'
import editUserReducer from './EditUser'
export default configureStore({
  reducer: {
    signup : sighnupReducer,
    profile:profileReducer,
    home:homeReducer,
    users:userReducer,
    AdminLogin:adminLoginReducer,
    userData:userDataReducer,
    editUser:editUserReducer
  },
})