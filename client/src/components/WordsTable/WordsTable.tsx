import React, { useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import { useDictionaryWords } from '../../hooks/api/useDictionaryWords'
import { useWindowSizeContext } from '../../context/WindowSizeContext'
import { Loading } from '../Loading'
import { IWord } from '../../types/word'
import { useRemoveWordsToDictionary } from '../../hooks/api/useRemoveWordsToDictionary'
import { getWordEnding } from '../../helpers/getWordEnding'
import { DeleteButton } from '../DeleteButton'

const WordsTable = () => {
	const { getDictionaryWords, loading } = useDictionaryWords()
	const { height, width } = useWindowSizeContext()
	const params = useParams()
	const navigate = useNavigate()
	const { dictionary = '' } = params
	const [rows, setRows] = useState<IWord[]>([])
	const [selected, setSelected] = useState<string[]>([])
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

	const getWordEnd = () => `Выбрано ${selected.length} ${getWordEnding(selected.length, 'слово', 'слова', 'слов')}`

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
				{/*TODO: временное решение с height*/}
				<TableContainer sx={{ height: height - 56 }}>
					<Table stickyHeader area-label='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell padding='checkbox'>
									<Checkbox
										indeterminate={selected.length > 0 && selected.length < rows.length}
										checked={rows.length > 0 && selected.length === rows.length}
										onChange={handleSelectAllClick}
									/>
								</TableCell>
								<TableCell colSpan={selected.length ? 2 : 1} align='center'>
									{selected.length ? getWordEnd() : 'Перевод'}
								</TableCell>
								{!selected.length && <TableCell align='center'>Слово</TableCell>}
								<TableCell align='center'>
									{selected.length ? (
										<DeleteButton onClick={onWordsDelete} disabled={isWordsDeleting} />
									) : width > 400 ? (
										'Транскрипция'
									) : (
										'Транс-крипция'
									)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row: IWord) => {
								const isItemSelected = selected.includes(row._id || '')
								return (
									<TableRow
										key={row._id}
										hover
										onClick={(event) => handleClick(event, row._id)}
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
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default WordsTable
