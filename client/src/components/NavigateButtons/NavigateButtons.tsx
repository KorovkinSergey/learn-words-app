import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'

interface IProps {
	title: string
	onSave: () => void
	repeat: () => void
}

const NavigateButtons: FC<IProps> = ({ title, onSave, repeat }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<Typography sx={{ fontSize: 18, margin: 2, maxWidth: 250 }} color='primary.contrastText'>
				{title}
			</Typography>
			<Button
				variant='contained'
				color='primary'
				fullWidth
				onClick={onSave}
				sx={{ margin: 2, maxWidth: 250, backgroundColor: 'secondary.main' }}
			>
				Перейти к тренировкам
			</Button>
			<Button
				variant='contained'
				color='primary'
				fullWidth
				onClick={repeat}
				sx={{ margin: 2, maxWidth: 250, backgroundColor: 'secondary.main' }}
			>
				Повторить
			</Button>
		</Box>
	)
}

export default NavigateButtons
