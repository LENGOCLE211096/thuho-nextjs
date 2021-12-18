import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { appWithTranslation } from "next-i18next"
import App from "next/app"
import { AppProps } from "next/dist/shared/lib/router/router"
import React from "react"
import { PersistGate } from "redux-persist/integration/react"
import { MuiTheme } from "../components/MuiTheme"
import nextI18NextConfig from "../next-i18next.config.js"
import { persistor, wrapper } from "../store"
import "../styles/main.css"

/**
 * @see https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/pages/_app.tsx
 */

class MyApp extends App<AppProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    jssStyles?.parentNode?.removeChild(jssStyles)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={MuiTheme}>
        <PersistGate loading={null} persistor={persistor}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </PersistGate>
      </ThemeProvider>
    )
  }
}

export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig))
