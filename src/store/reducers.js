import { combineReducers } from "redux"

import layoutReducer from "./modules/layout/reducer"
import authReducer from "./modules/auth/reducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
})

export default rootReducer
