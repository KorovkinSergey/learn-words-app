import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { WindowSizeContextProvider } from './context/WindowSizeContext'
import { AuthContextProvider } from './context/AuthContext'
import { SettingsSortNewWordsContextProvider } from './context/SettingsSortNewWordsContext'
import { SettingsLearnWordsContextProvider } from './context/SettingsLearnWordsContext'
import { SettingsWordsContextProvider } from './context/SettingsWordsContext'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#ffffff',
		},
		success: {
			light: '#757ce8',
			main: '#3b8132',
			dark: '#002884',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000000',
		},
		common: {
			black: '#84e094',
			white: '#ff7961',
		},
	},
})

root.render(
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<WindowSizeContextProvider>
				<SettingsLearnWordsContextProvider>
					<SettingsSortNewWordsContextProvider>
						<SettingsWordsContextProvider>
							<App />
						</SettingsWordsContextProvider>
					</SettingsSortNewWordsContextProvider>
				</SettingsLearnWordsContextProvider>
			</WindowSizeContextProvider>
		</AuthContextProvider>
	</ThemeProvider>,
)
