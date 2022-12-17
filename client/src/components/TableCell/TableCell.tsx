import { IWord } from '../../types/word'
import React from 'react'
import { Checkbox, TableRow } from '@mui/material'
import TableCell from '@mui/material/TableCell'

interface TableCellMemoProps {
	row: IWord
	handleClick: (e: any, id: string) => void
	selected: string[]
}

const TableCellMemo: React.FC<TableCellMemoProps> = ({ row, handleClick, selected }) => {
	const isItemSelected = selected.includes(row._id || '')
	return (
		<TableRow
			hover
			onClick={(event) => handleClick(event, row._id || '')}
			role='checkbox'
			aria-checked={isItemSelected}
			selected={isItemSelected}
		>
			<TableCell padding='checkbox'>
				<Checkbox color='primary' checked={isItemSelected} />
			</TableCell>
			<TableCell align='center'>{row.russian}</TableCell>
			<TableCell align='center'>{row.english}</TableCell>
			<TableCell align='center'>{row.transcript}</TableCell>
		</TableRow>
	)
}

export default React.memo(TableCellMemo)
