import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status : false,
    userData : null,
    allPostData : [],
    getSinglePost : null
}

export const authSlice = createSlice({ // need debuging
    name : "authSlice",
    initialState,
    reducers : {
        login : (state, aciton)=>{
            state.status = true;
            state.userData = aciton.payload
        },
        logout : (state)=>{
            state.status = false;
            state.userData = null;
        },
        pushInPost : (state,action)=>{
            state.allPostData.push(action.payload)
        },
        putAllPost : (state, action)=>{
            state.allPostData = action.payload;
        },
        putSinglePost : (state, action)=>{
            state.getSinglePost = action.payload;
        }
    }
})

export const { login, logout, pushInPost, putAllPost,putSinglePost} = authSlice.actions  ;


