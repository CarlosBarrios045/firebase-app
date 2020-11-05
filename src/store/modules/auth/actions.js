import Router from "next/router"
import { SIGN_IN, SIGN_OUT } from "./constants"

// Utils
import createAction from "src/utils/createAction"

// Create Actions
const signinAction = createAction(SIGN_IN)
const signoutAction = createAction(SIGN_OUT)

// Actions
export const actions = {
  signIn: (user) => signinAction(user),
  signOut: () => signoutAction(),
}

// Actions Creator
export const signIn = ({ email, password }) => async (dispatch) => {
  console.log({ email, password })

  try {
    await localStorage.removeItem("token")
    dispatch(actions.signOut())

    // Fetch API

    // Success
    dispatch(actions.signIn({ name: "Juan", lastname: "Barrios" }))
    await localStorage.setItem("token", "1234")
    Router.push("/")
  } catch (e) {
    console.log({ e })
    await localStorage.removeItem("token")
    dispatch(actions.signOut())
  }
}

export const signOut = () => async (dispatch) => {
  try {
    await localStorage.removeItem("token")
    dispatch(actions.signOut())
    Router.push("/iniciar-sesion")
  } catch (e) {
    console.log({ e })
  }
}
