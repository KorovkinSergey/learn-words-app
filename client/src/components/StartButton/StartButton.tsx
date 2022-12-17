import React, { FC, memo } from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

interface IProps {
	onClick: () => void
	disabled?: boolean
}

const StartButton: FC<IProps> = ({ onClick, disabled }) => {
	return (
		<Box sx={{ flex: '1 1 auto', width: '100%', display: 'flex', alignItems: 'end', paddingBottom: 4 }}>
			<Button
				fullWidth
				variant='contained'
				disabled={disabled}
				onClick={onClick}
				sx={{
					backgroundColor: 'secondary.main',
				}}
			>
				Старт
			</Button>
		</Box>
	)
}

export default memo(StartButton)
