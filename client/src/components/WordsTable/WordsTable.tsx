import React, { useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import { useDictionaryWords } from '../../hooks/api/useDictionaryWords'
import { useWindowSizeContext } from '../../context/WindowSizeContext'
import { Loading } from '../Loading'
import { IWord } from '../../types/word'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRemoveWordsToDictionary } from '../../hooks/api/useRemoveWordsToDictionary'
import { getWordEnding } from '../../helpers/getWordEnding'

const WordsTable = () => {
	const { getDictionaryWords, loading } = useDictionaryWords()
	const { height } = useWindowSizeContext()
	const params = useParams()
	const navigate = useNavigate()
	const { dictionary = '' } = params
	const [rows, setRows] = useState<IWord[]>([])
	const [selected, setSelected] = useState<string[]>([])
	const wordEnding = getWordEnding(selected.length, 'слово', 'слова', 'слов')
	const { deleteHandler, loading: isWordsDeleting } = useRemoveWordsToDictionary()

	useEffect(() => {
		if (!dictionary) return navigate('/dictionary')
		getDictionaryWords(dictionary).then((res: any) => setRows(res.words))
	}, [dictionary, navigate, getDictionaryWords])

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked && event.target.dataset.indeterminate === 'false') {
			setSelected(rows.map((row) => row._id as string))
			return
		}
		setSelected([])
	}

	const isRowSelected = (id = '') => selected.includes(id)

	const getRowsToDelete = () => rows.filter((row) => selected.includes(row._id || ''))

	const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id = '') => {
		selected.includes(id) ? setSelected(selected.filter((rowId) => rowId !== id)) : setSelected([...selected, id])
	}

	if (loading) return <Loading />

	const onWordsDelete = () => {
		deleteHandler(dictionary, getRowsToDelete()).then(() => {
			getDictionaryWords(dictionary).then((res: any) => setRows(res.words))
			setSelected([])
		})
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ overflow: 'hidden' }}>
				<TableContainer sx={{ height: height - 56 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell align="center" sx={{ paddingRight: 0, paddingLeft: 1 }}>
									<Checkbox
										indeterminate={selected.length > 0 && selected.length < rows.length}
										checked={rows.length > 0 && selected.length === rows.length}
										onChange={handleSelectAllClick}
										sx={{ padding: 0, minWidth: '24px' }}
									/>
								</TableCell>
								<TableCell align="center">
									{selected.length ? `Выбрано ${selected.length} ${wordEnding}` : 'Перевод'}
								</TableCell>
								<TableCell align="center">{selected.length ? '' : 'Слово'}</TableCell>
								<TableCell align="center">
									{selected.length ? (
										/* eslint-disable-next-line max-len */
										<Button startIcon={<DeleteIcon />} onClick={onWordsDelete} disabled={isWordsDeleting}>
											Удалить
										</Button>
									) : (
										'Транскрипция'
									)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row: IWord) => {
								const isItemSelected = isRowSelected(row._id)
								return (
									<TableRow
										key={row._id}
										hover
										onClick={(event) => handleClick(event, row._id)}
										role="checkbox"
										aria-checked={isItemSelected}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox color="primary" checked={isItemSelected} />
										</TableCell>
										<TableCell align="center">{row.russian}</TableCell>
										<TableCell align="center">{row.english}</TableCell>
										<TableCell align="center">{row.transcript}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default WordsTable
