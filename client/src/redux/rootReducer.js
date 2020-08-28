import {combineReducers} from "redux"

import userReducers from "./reducers/userReducers"
import postReducer from "./reducers/userReducers"

const rootReducer  = combineReducers({
    user:userReducers,
   post:postReducer
})

export default rootReducer;