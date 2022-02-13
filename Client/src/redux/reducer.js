import { combineReducers } from "@reduxjs/toolkit";

import homePageReducer from "../components/homepage/homePageSlice";

const rootReducer = combineReducers({
    homepage: homePageReducer
})

export default rootReducer