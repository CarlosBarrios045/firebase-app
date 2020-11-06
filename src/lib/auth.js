import { useState, useEffect, useContext, createContext } from "react"
import Router from "next/router"
import { isEmpty } from "lodash"

import firebase from "./firebase"
import { createUser } from "./db"

const auth = firebase.auth()
const db = firebase.firestore()

const response = (error, success) => ({ error, success })

const authContext = createContext()

export const useAuth = () => {
  return useContext(authContext)
}

export function AuthProvider({ children }) {
  const authValue = useProvideAuth()
  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  )
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { /* token */ ...userWithoutToken } = user
      createUser(user.uid, userWithoutToken)

      setUser(user)
      /*  cookie.set("fast-feedback-auth", true, {
        expires: 1,
      }) */

      setLoading(false)
      return user
    } else {
      setUser(false)
      // cookie.remove("fast-feedback-auth")

      setLoading(false)
      return false
    }
  }

  const signUp = async ({ name, dni, email, password }) => {
    setLoading(true)

    try {
      /* const verifyDNI = (snapshot) => {
        const filt = (snapshot) => filter(snapshot.docs, (item) => item.data()?.dni === dni)
        if(isEmpty(filt)) {

        } else {
          console.log()
        }

      } */
      const Users = await db.collection("users")

      // Get Users
      const userRepeatDni = []
      const userRepeatEmail = []

      await Users.where("dni", "==", dni)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userRepeatDni.push(doc.data())
          })
        })
      await Users.where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userRepeatEmail.push(doc.data())
          })
        })

      if (!isEmpty(userRepeatDni)) {
        return response({ dni: "El DNI ya está en uso" }, false)
      }

      if (!isEmpty(userRepeatEmail)) {
        return response(
          { email: "El correo electrónico ya está en uso" },
          false
        )
      }

      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await user.updateProfile({ displayName: name })

      const { token, ...userWithoutToken } = formatUser(user)
      await createUser(user.uid, { ...userWithoutToken, dni })

      setLoading(false)
      return response("Usuario creado correctamente", true)
    } catch (error) {
      console.error("Sign Up ->", error)
      setLoading(false)
    }
  }

  const signinWithEmail = (email, password) => {
    setLoading(true)
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      console.log({ res: response.user })
      handleUser(response.user)
      Router.push("/")
    })
  }

  /* const signinWithGitHub = (redirect) => {
    setLoading(true)
    return auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user)

        if (redirect) {
          Router.push(redirect)
        }
      })
  }

  const signinWithGoogle = (redirect) => {
    setLoading(true)
    return  auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user)

        if (redirect) {
          Router.push(redirect)
        }
      })
  } */

  const signOut = () => {
    Router.push("/iniciar-sesion")

    return auth.signOut().then(() => handleUser(false))
  }

  useEffect(() => {
    // If change token
    const unsubscribe = auth.onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signUp,
    signinWithEmail,
    signOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.xa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}
