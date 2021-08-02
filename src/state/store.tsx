import userSlice  from "./features/allDataSlice";
import  distSlice  from "./features/districtSlice";
import { configureStore } from "@reduxjs/toolkit";

// configuring store with two reducers
const store =  configureStore({
    reducer:{
        user: userSlice,
        dist: distSlice
    }
});

// exporting typeof rootstate for state
export type RootState = ReturnType<typeof store.getState>;
export default store;