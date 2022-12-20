import { IWordWithCheck } from '../../types/word'
import React from 'react'
import { Checkbox, TableRow } from '@mui/material'
import TableCell from '@mui/material/TableCell'

interface TableCellMemoProps {
	row: IWordWithCheck
	handleClick: (id: string) => void
	isChecked: boolean
}

const TableCellMemo: React.FC<TableCellMemoProps> = ({ row, handleClick, isChecked }) => {
	return (
		<TableRow
			hover
			onClick={() => handleClick(row._id ?? '')}
			role='checkbox'
			aria-checked={isChecked}
			selected={isChecked}
		>
			<TableCell padding='checkbox'>
				<Checkbox color='primary' checked={isChecked} />
			</TableCell>
			<TableCell align='center'>{row.russian}</TableCell>
			<TableCell align='center'>{row.english}</TableCell>
			<TableCell align='center'>{row.transcript}</TableCell>
		</TableRow>
	)
}

export default React.memo(TableCellMemo)
