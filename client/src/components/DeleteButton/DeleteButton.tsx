import React from 'react'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { TABLE_TEXT_HEIGHT } from '../../consts/style-variables'

interface IProps {
	onClick: () => void
	disabled: boolean
	size: 'small' | 'medium' | 'large' | undefined
}

const DeleteButton = ({ onClick, disabled, size }: IProps) => {
	return (
		<Button
			sx={{ padding: '0', lineHeight: TABLE_TEXT_HEIGHT }}
			startIcon={<DeleteIcon />}
			onClick={onClick}
			disabled={disabled}
			size={size}
		>
			Удалить
		</Button>
	)
}

export default DeleteButton
