import React, { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

interface IProps {
	children: ReactNode
	top?: boolean
}

const Wrapper: FC<IProps> = ({ children, top }) => {
	const stylesDefault = {
		display: 'flex',
		width: '100%',
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '1 1 auto',
		p: 4,
	}
	if (top) {
		stylesDefault.justifyContent = 'flex-start'
	}

	return <Box sx={stylesDefault}>{children}</Box>
}

export default Wrapper
