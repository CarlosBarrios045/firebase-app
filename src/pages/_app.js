import { useEffect } from "react"
import { func, object } from "prop-types"

// Head
import Head from "src/layout/Head"

// Redux
import { Provider } from "react-redux"
import wrapperRedux from "src/store"
import { store } from "src/store/store"

// Auth Connect
import AuthConnect from "src/hooks/AuthConnect"

// Material UI
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

// Layout
import Layout from "src/layout/Layout"

// Theme
import theme from "../theme"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }) => {
  // on Mount
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head />

      {/* Redux Store */}
      <Provider store={store}>
        <AuthConnect store={store}>
          <ThemeProvider theme={theme}>
            {/* Reset CSS */}
            <CssBaseline />

            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AuthConnect>
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: func,
  pageProps: object,
}

export default wrapperRedux.withRedux(MyApp)
