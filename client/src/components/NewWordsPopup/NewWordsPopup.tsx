import * as React from 'react'
import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { Loading } from '../Loading'
import { IDictionariesList } from '../../types/dictionary'

export interface NewWordsPopupProps {
	dictionaries: IDictionariesList
	onChange: (arr: string[]) => void
	loading: boolean
	open: boolean
	handleClose: () => void
}

const NewWordsPopup: FC<NewWordsPopupProps> = (props) => {
	const { onChange, open, loading, handleClose, dictionaries } = props
	const [checked, setChecked] = useState<string[]>([])
	const [isCheckAll, setIsCheckAll] = useState<boolean>(false)

	const checkAll = () => {
		if (isCheckAll) {
			setIsCheckAll(false)
			setChecked([])
		} else {
			setIsCheckAll(true)
			setChecked(dictionaries.map((item) => item.name))
		}
	}

	const onCheck = (name: string) => {
		if (checked.includes(name)) {
			setChecked(checked.filter((item) => item !== name))
		} else {
			setChecked((prev) => [...prev, name])
		}
	}

	const onSave = () => {
		onChange(checked)
	}

	if (loading)
		return (
			<div>
				<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
					<DialogTitle>Выберите словари с темами</DialogTitle>
					<div>
						<Loading />
					</div>
				</Dialog>
			</div>
		)

	return (
		<div>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Выберите словари с темами</DialogTitle>
				<DialogContent>
					<Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
						<FormGroup>
							<FormControlLabel
								key='checkAll'
								control={<Checkbox checked={isCheckAll} onClick={checkAll} />}
								label={isCheckAll ? 'Снять выделение' : 'Выбрать все'}
								sx={{ borderBottom: '1px solid #000000' }}
							/>
							<hr />
							{dictionaries.map((item) => {
								return (
									<>
										<FormControlLabel
											key={item.name}
											control={
												<Checkbox
													checked={checked ? checked.includes(item.name) : false}
													onClick={() => onCheck(item.name)}
												/>
											}
											label={item.title}
										/>
									</>
								)
							})}
						</FormGroup>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='primary' size='medium' onClick={onSave}>
						Получить новые слова
					</Button>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default NewWordsPopup
