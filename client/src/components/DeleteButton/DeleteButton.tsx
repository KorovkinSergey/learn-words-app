import React from 'react'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface IProps {
	onClick: () => void
	disabled: boolean
}

const DeleteButton = ({onClick, disabled}: IProps) => {
	return (
		<Button startIcon={<DeleteIcon />} onClick={onClick} disabled={disabled}>
			Удалить
		</Button>
	)
}

export default DeleteButton
