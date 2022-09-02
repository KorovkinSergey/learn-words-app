import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Box from '@mui/material/Box'
import Navigation from './components/Navigation/Navigation'
import { Container } from '@mui/material'

import { useAuthContext } from './context/AuthContext'
import { useRoutes } from './routes'
import { useWindowSizeContext } from './context/WindowSizeContext'

const App = () => {

	const { isAuthenticated } = useAuthContext()
	const { height } = useWindowSizeContext()
	const routes = useRoutes(isAuthenticated)
	return (
		<Container disableGutters maxWidth='sm' sx={{
			display: 'flex',
			flexDirection: 'column',
			height: height + 'px',
			backgroundColor: 'primary.main',
			padding: '0px',
		}} fixed>
			<BrowserRouter>
				<Box sx={{ width: '100%', flex: '1 1 auto', display: 'flex' }}>
					{routes}
				</Box>
				{isAuthenticated && <Navigation />}
			</BrowserRouter>
		</Container>
	)
}

export default App
