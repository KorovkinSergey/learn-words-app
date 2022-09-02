import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { CircularProgress } from '@mui/material'

export default function Loading({ backgroundColor }: { backgroundColor?: string }) {
	return (
		<Box sx={{ width: '100%' }}>
			<Paper
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: backgroundColor,
				}}
			>
				<CircularProgress disableShrink />
			</Paper>
		</Box>
	)
}
