import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, MenuItem, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import { useDictionaryWords } from '../../hooks/api/useDictionaryWords'
import { useWindowSizeContext } from '../../context/WindowSizeContext'
import { Loading } from '../Loading'
import { IWordWithCheck } from '../../types/word'
import { useRemoveWordsToDictionary } from '../../hooks/api/useRemoveWordsToDictionary'
import { getWordEnding } from '../../helpers/getWordEnding'
import { TABLE_HEADER_HEIGHT } from '../../consts/style-variables'
import SelectWordsToTransfer from '../Select/Select'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { IDictionary } from '../../types/dictionary'
import { useAddWordsToDictionary } from '../../hooks/api/useAddWordsToDictionary'
import { DeleteButton } from '../DeleteButton'
import { TableCellMemo } from '../TableCell'
import { addCheckFieldInWords, removeCheckFieldInWords } from '../../helpers/customizeWords'

const WordsTable = () => {
	const { getDictionaryWords, loading } = useDictionaryWords()
	const { height, width } = useWindowSizeContext()
	const { getDictionaryList, loading: dictionaryListLoading } = useDictionaryList()
	const params = useParams()
	const navigate = useNavigate()
	const { dictionary: currDictionary = '' } = params
	const [rows, setRows] = useState<IWordWithCheck[]>([])
	const [dictionaries, setDictionaries] = useState<IDictionary[]>([])
	const { deleteHandler, loading: isWordsDeleting } = useRemoveWordsToDictionary()
	const { addWordsHandler, loading: isWordsAdding } = useAddWordsToDictionary()
	const [isSelected, setIsSelected] = useState(false)
	const [isCheckAll, setIsCheckAll] = useState(false)

	useEffect(() => {
		if (!currDictionary) return navigate('/dictionary')
		getDictionaryWords(currDictionary).then((res: any) => setRows(addCheckFieldInWords(res.words)))
		getDictionaryList().then((res: any) => setDictionaries(res))
	}, [currDictionary, navigate, getDictionaryWords, getDictionaryList])

	useEffect(() => {
		if (rows.some((item) => item.check)) {
			setIsSelected(true)
		} else {
			setIsSelected(false)
		}
	}, [rows])

	const onCheckAll = useCallback(
		(arr: IWordWithCheck[]) => {
			if (isCheckAll) {
				setIsCheckAll(false)
				return arr.map((row) => ({ ...row, check: false }))
			}
			setIsCheckAll(true)
			return arr.map((row) => ({ ...row, check: true }))
		},
		[isCheckAll],
	)

	const handleSelectAllClick = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.dataset.indeterminate === 'false') {
				setRows((rows) => onCheckAll(rows))
				setIsSelected(true)
				return
			}
			setRows((rows) => onCheckAll(rows))
			setIsSelected(false)
		},
		[setIsSelected, onCheckAll],
	)

	const getWordEnd = useMemo(() => {
		const selected = rows.reduce((acc, item) => {
			return acc + (item.check ? 1 : 0)
		}, 0)
		return `Выбрано ${selected} ${getWordEnding(selected, 'слово', 'слова', 'слов')}`
	}, [rows])

	const getSelectedRows = useCallback(() => {
		if (isCheckAll) {
			return removeCheckFieldInWords(rows)
		}
		return removeCheckFieldInWords(rows.filter((row) => row.check))
	}, [rows, isCheckAll])

	const handleClick = useCallback(
		(id: string = '') => {
			if (isCheckAll) setIsCheckAll(false)
			setRows((prevState) =>
				prevState.map((row) => {
					if (row._id === id) {
						return { ...row, check: !row.check }
					}
					return row
				}),
			)
		},
		[isCheckAll],
	)

	const onWordsDelete = useCallback(() => {
		if (isCheckAll) setIsCheckAll(false)
		deleteHandler(currDictionary, getSelectedRows()).then(() => {
			getDictionaryWords(currDictionary).then((res: any) => setRows(addCheckFieldInWords(res.words)))
		})
	}, [getDictionaryWords, deleteHandler, currDictionary, setRows, getSelectedRows, isCheckAll])

	const onTransferWords = useCallback(
		async (id: string) => {
			if (isCheckAll) setIsCheckAll(false)
			await deleteHandler(currDictionary, getSelectedRows())
			await addWordsHandler(id, getSelectedRows())
			await getDictionaryWords(currDictionary).then((res: any) => setRows(addCheckFieldInWords(res.words)))
		},
		[currDictionary, deleteHandler, getSelectedRows, setRows, addWordsHandler, getDictionaryWords, isCheckAll],
	)

	const renderItems = useMemo(() => {
		return dictionaries
			?.filter(({ _id }) => _id !== currDictionary)
			.map(({ _id: id, title }) => {
				return (
					<MenuItem disabled={dictionaryListLoading} key={id} value={id}>
						{title}
					</MenuItem>
				)
			})
	}, [dictionaries, currDictionary, dictionaryListLoading])

	if (loading) return <Loading />

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ overflow: 'hidden' }}>
				{/*TODO: временное решение с height*/}
				<TableContainer sx={{ height: height - TABLE_HEADER_HEIGHT }}>
					<Table stickyHeader area-label='sticky table'>
						<TableHead>
							<TableRow>
								<TableCell padding='checkbox'>
									<Checkbox
										sx={{ padding: '0 0 0 9px' }}
										indeterminate={isCheckAll}
										checked={isCheckAll}
										onChange={handleSelectAllClick}
									/>
								</TableCell>
								<TableCell align='center'>{isSelected ? getWordEnd : 'Перевод'}</TableCell>
								<TableCell align='center'>
									{isSelected ? (
										<SelectWordsToTransfer
											loading={isWordsAdding || isWordsDeleting}
											renderItems={renderItems}
											size='small'
											value='Переместить'
											onChange={onTransferWords}
										/>
									) : (
										'Слово'
									)}
								</TableCell>
								<TableCell align='center'>
									{isSelected ? (
										<DeleteButton onClick={onWordsDelete} size='small' disabled={isWordsDeleting} />
									) : width > 400 ? (
										'Транскрипция'
									) : (
										'Транс-крипция'
									)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableCellMemo row={row} isChecked={row.check} handleClick={handleClick} key={row._id} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default React.memo(WordsTable)
