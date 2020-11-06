import { useEffect, useState } from "react"
import filter from "lodash/filter"

// Next
import { useRouter } from "next/router"

// Auth
import { useAuth } from "src/lib/auth"

import routes from "./routes"

const AuthVerify = ({ children }) => {
  // State
  const [restricted, setRestricted] = useState(false)
  const [ready, setReady] = useState(false)

  // Auth
  const { user } = useAuth()

  const { push, pathname } = useRouter()
  const filterRoute = () => filter(routes, (r) => r.pathname === pathname)[0]

  useEffect(() => {
    const routeCurrent = filterRoute()
    setRestricted(routeCurrent?.restricted || false)
    setReady(true)
  }, [pathname])

  useEffect(() => {
    console.log({ user })
    if (ready) {
      if (!user && restricted) {
        push("/iniciar-sesion")
      } else if (user && !restricted) {
        push("/")
      }
    }
  }, [user, restricted, ready])

  if (!user && restricted) return null
  if (user && !restricted) return null
  return <>{children}</>
}

export default AuthVerify
