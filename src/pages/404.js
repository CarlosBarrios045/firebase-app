import { useEffect } from "react"

// Next
import Router from "next/router"

const PageNotFound = () => {
  useEffect(() => {
    console.log("Not Found")
    Router.push("/")
  }, [])

  return null
}

export default PageNotFound
