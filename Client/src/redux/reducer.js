import { combineReducers } from "@reduxjs/toolkit";

import homePageReducer from "../components/homepage/homePageSlice";
import loginpageReducer from "../components/loginpage/loginSlice"
const rootReducer = combineReducers({
    homepage: homePageReducer,
    loginpage: loginpageReducer
})

export default rootReducer