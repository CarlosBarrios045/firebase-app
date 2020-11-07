import { combineReducers } from "redux"

import layoutReducer from "./modules/layout/reducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
})

export default rootReducer
