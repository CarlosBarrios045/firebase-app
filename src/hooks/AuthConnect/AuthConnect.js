import { useEffect, useState } from "react"
import filter from "lodash/filter"

// Next
import { useRouter } from "next/router"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { signIn } from "src/store/modules/auth/actions"

import routes from "./routes"

const AuthConnect = ({ children }) => {
  // State
  const [restricted, setRestricted] = useState(false)
  const [ready, setReady] = useState(false)

  // Redux
  const isAuth = useSelector(({ auth }) => auth.isAuth)
  const dispatch = useDispatch()

  const { push, pathname } = useRouter()
  const filterRoute = () => filter(routes, (r) => r.pathname === pathname)[0]

  const getToken = async () => {
    const token = await localStorage.getItem("token")
    if (token) dispatch(signIn({ email: "Juan", password: "Barrios" }))
  }
  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    const routeCurrent = filterRoute()
    setRestricted(routeCurrent?.restricted || false)
    setReady(true)
  }, [pathname])

  useEffect(() => {
    if (ready) {
      if (!isAuth && restricted) {
        push("/iniciar-sesion")
      } else if (isAuth && !restricted) {
        push("/")
      }
    }
  }, [isAuth, restricted, ready])

  if (!isAuth && restricted) return null
  if (isAuth && !restricted) return null
  return <>{children}</>
}

export default AuthConnect
