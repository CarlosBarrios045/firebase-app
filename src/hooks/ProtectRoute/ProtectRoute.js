import { useEffect } from "react"
import filter from "lodash/filter"

// Next
import { useRouter } from "next/router"

// Auth
import { useAuth } from "src/lib/auth"

// Redux
import { useDispatch } from "react-redux"

// Actions
import { closeSidebar } from "src/store/modules/layout/actions"

import routes from "./routes"

const ProtectRoute = ({ children }) => {
  // Auth
  const { user, isLoading } = useAuth()

  const { push, pathname, events } = useRouter()
  const filterRoute = (url = pathname) =>
    filter(routes, (r) => r.pathname === url)[0]

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      // Check that a new route is OK
      const routeCurrent = filterRoute()?.restricted

      const handleRouteChange = (url) => {
        // If change of route, close sidebar
        dispatch(closeSidebar())

        const newRouteCurrent = filterRoute(url)?.restricted
        if (newRouteCurrent && !user) {
          push("/iniciar-sesion")
        } else if (user && !newRouteCurrent) {
          push("/")
        }
      }

      // Check that initial route is OK
      if (routeCurrent && !user) {
        push("/iniciar-sesion")
      } else if (user && !routeCurrent) {
        push("/")
      }

      // Monitor routes
      events.on("routeChangeStart", handleRouteChange)
      return () => {
        events.off("routeChangeStart", handleRouteChange)
      }
    }
  }, [user, pathname, isLoading])

  // Return Loader
  if (isLoading) return null
  return <>{children}</>
}

export default ProtectRoute
