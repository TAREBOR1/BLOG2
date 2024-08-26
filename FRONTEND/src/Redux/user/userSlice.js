import { createSlice } from '@reduxjs/toolkit';

const initialState={
    currentUser:null,
    errorMessage:null,
    isLoading:false
}

const userSlice= createSlice({
   name:'user',
   initialState,
   reducers:{
       signInStart:(state)=>{
        state.errorMessage=null,
        state.isLoading=true
       },
       signInSuccess:(state,action)=>{
        state.currentUser=action.payload,
        state.errorMessage=null,
        state.isLoading=false
       },
       signInFailure:(state,action)=>{
        state.isLoading=false,
        state.errorMessage=action.payload
       },
       updateStart:(state)=>{
        state.errorMessage=null,
        state.isLoading=true
       },
       updateSuccess:(state,action)=>{
        state.currentUser=action.payload,
        state.errorMessage=null,
        state.isLoading=false
       },
       updateFailure:(state,action)=>{
        state.isLoading=false,
        state.errorMessage=action.payload
       }
   }
})

export const {signInFailure,signInStart,signInSuccess,updateFailure,updateStart,updateSuccess}= userSlice.actions;

export default userSlice.reducer