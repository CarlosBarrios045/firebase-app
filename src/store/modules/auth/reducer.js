import { SIGN_IN, SIGN_OUT, SET_USER_DATA } from "./constants"
import setToState from "src/utils/setToState"

const initialState = {
  isAuth: false,
  user: {},
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return setToState(state, {
        isAuth: true,
        user: payload.data,
      })

    case SIGN_OUT:
      return setToState(state, initialState)

    case SET_USER_DATA:
      return setToState(state, {
        user: payload.data,
      })

    default:
      return state
  }
}

export default authReducer
