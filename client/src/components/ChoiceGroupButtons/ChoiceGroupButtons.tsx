import React, { FC, memo } from 'react'
import { Box, Button } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'

interface IProps {
	succsesTitle: string
	succsesOnClick: () => void
	rejectTitle: string
	rejectOnClick: () => void
}

const ChoiceGroupButtons: FC<IProps> = ({ succsesTitle, succsesOnClick, rejectTitle, rejectOnClick }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: '300px',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Button
				size='large'
				variant='contained'
				color='success'
				startIcon={<DoneIcon />}
				onClick={succsesOnClick}
				fullWidth
				sx={{ m: 2 }}
			>
				{succsesTitle}
			</Button>
			<Button
				size='large'
				variant='contained'
				color='error'
				startIcon={<CloseIcon />}
				onClick={rejectOnClick}
				fullWidth
				sx={{ m: 2 }}
			>
				{rejectTitle}
			</Button>
		</Box>
	)
}

export default memo(ChoiceGroupButtons)
