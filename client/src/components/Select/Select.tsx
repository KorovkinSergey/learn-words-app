import * as React from 'react'
import { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import { MenuItem, Typography } from '@mui/material'
import { TABLE_TEXT_HEIGHT } from '../../consts/style-variables'

export interface SelectProps {
	value?: string
	onChange: (v: string) => void
	size: 'small' | 'medium' | undefined
	id?: string
	renderItems: (JSX.Element | undefined)[]
	loading: boolean
}

const SelectWordsToTransfer: FC<SelectProps> = (props) => {
	const [open, setOpen] = React.useState(false)
	const { renderItems, onChange, size, id, loading } = props
	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value)
	}
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		if (reason !== 'backdropClick') {
			setOpen(false)
		}
	}

	return (
		<div>
			<Button size='small' sx={{ padding: '0', lineHeight: TABLE_TEXT_HEIGHT }} onClick={handleClickOpen}>
				Переместить
			</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Переместить слов(а) в другой словарь</DialogTitle>
				<DialogContent>
					<Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormControl sx={{ m: 1, width: '80%' }}>
							<Typography variant='subtitle1' gutterBottom>
								Выберите словарь:
							</Typography>
							<Select defaultValue='default' disabled={loading} id={id} size={size} onChange={handleChange}>
								<MenuItem sx={{ display: 'none' }} key='default' value='default'>
									Выбрать
								</MenuItem>
								{renderItems}
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default SelectWordsToTransfer
