import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DistrictList } from "./districtSlice";

//interface for user list
export interface UsersList {
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    verified:boolean,
    middle_initial:string | null,
    created_at: string,
    district: number,
    active:boolean
}

// interface for object payload
export interface DoublePayload {
    item1:number,
    item2:UsersList
}

// interface to store/export state
export interface ExportState {
    user: UsersList[];
    dist: DistrictList[];
}

// setting state array to an array of uxerlist interface 
const state:Array<UsersList> = [];

// initilizing slice, relying on IMMER to do the immutable state work
export const userSlice = createSlice({
    // nameing and initial state setting
    name:'userData',
    initialState:state,
    reducers:{
        // reducer to add a userslist type obj
        addUserData: (state,action: PayloadAction<UsersList>):void =>{
            state.push(action.payload);
        },
        // reducer to splice out specific objc
        removeUserData:(state,action: PayloadAction<number>):void=>{
            state.splice(action.payload,1);
        },
        // reducer to edit specific, object as payload
        replaceUserData:(state,action: PayloadAction<DoublePayload>):void=>{
            state.splice(action.payload.item1,1,action.payload.item2);
        }
    }
});

// exports exports exports, gotta love them!
export const getUserState = (state: RootState):ExportState=> state;
export default userSlice.reducer;
export const {addUserData,removeUserData,replaceUserData} = userSlice.actions;

