import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExportState } from "./allDataSlice";

// initializing interface for districlist
export interface DistrictList {
    id:number,
    name:string,
    city:string,
}

// initializing state array to interface of DistrictList 
const state:Array<DistrictList> = [];

// initializing slice
export const distSlice = createSlice({
    // nameing and setting initial state
    name:'districtData',
    initialState:state,
    reducers:{
        // only one reducer to get all district obj using interface of list
        addDistrictData: (state,action: PayloadAction<DistrictList>):void =>{
            state.push(action.payload);
        },
    }
});

// exports exports exports
export const getDisState = (state: RootState):ExportState => state;
export default distSlice.reducer;
export const {addDistrictData} = distSlice.actions;

