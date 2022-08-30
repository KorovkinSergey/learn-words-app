import React from "react"
import ReactDOM from "react-dom/client"
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { WindowSizeContextProvider } from './context/WindowSizeContext'
import { AuthContextProvider } from './context/AuthContext'
import { SettingsNewWordsContextProvider } from './context/SettingsNewWordsContext'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

root.render(
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <WindowSizeContextProvider>
        <SettingsNewWordsContextProvider>
          <App/>
        </SettingsNewWordsContextProvider>
      </WindowSizeContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
)
