import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from '@mui/material'
import { Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import { Loading } from '../../components/Loading'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { useAuthContext } from '../../context/AuthContext'
import { Wrapper } from '../../components/Wrapper'
import { Title } from '../../components/Title'
import NewWordsPopup from '../../components/NewWordsPopup/NewWordsPopup'
import { useNewDictionaryList } from '../../hooks/api/useNewDictionaryList'
import { IDictionariesList } from '../../types/dictionary'
import { useAddNewWordsToDictionary } from '../../hooks/api/useAddNewWordsToDictionary'
import { useRemoveDictionary } from '../../hooks/api/useRemoveDictionary'

const DictionaryPage = () => {
	const { dictionary, token } = useAuthContext()
	const { getDictionaryList: getUserDictionaries, loading } = useDictionaryList()
	const { getNewDictionaryList: getDictionaryList, loading: getDictionaryListLoading } = useNewDictionaryList()
	const { deleteHandler } = useRemoveDictionary()
	const { addNewWordsHandler, loading: addNewWordsLoading } = useAddNewWordsToDictionary()
	const [userDictionaries, setUserDictionaries] = useState([])
	const [dictionaryList, setDictionaryList] = useState<IDictionariesList>([])
	const buttonRef = useRef(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const closePopup = useCallback(() => {
		setIsModalOpen(false)
	}, [setIsModalOpen])

	useEffect(() => {
		getUserDictionaries().then(setUserDictionaries)
	}, [getUserDictionaries, token])

	const addNewWords = async () => {
		if (!dictionary) return
		setIsModalOpen(true)
		getDictionaryList().then((res: any) => setDictionaryList(res))
	}
	const saveWords = async (names: string[]) => {
		setIsModalOpen(false)
		addNewWordsHandler(names)
	}
	const [modal, setOpen] = React.useState({ open: false, id: '', title: '' })

	const deleteDictionary = () => {
		deleteHandler(modal.id)
			.then(() => {
				setOpen({ open: false, id: '', title: '' })
				return getUserDictionaries()
			})
			.then(setUserDictionaries)
	}
	const handleClickOpen = (title: string, id: string) => {
		setOpen({ open: true, id, title })
	}

	const handleClose = () => {
		setOpen({ open: false, id: '', title: '' })
	}

	if (loading || addNewWordsLoading) return <Loading />

	return (
		<Wrapper>
			<Title title='Список словарей' />
			<List>
				{userDictionaries.map((item: any) => {
					return (
						<ListItem key={item._id} sx={{ '& > a': { textDecoration: 'none' } }}>
							<ListItemAvatar>
								<Avatar>
									<Folder />
								</Avatar>
							</ListItemAvatar>
							<Link to={`/dictionary/${item._id}`}>
								<ListItemText sx={{ color: 'white' }} primary={item.title} />
							</Link>
							{!item.basic && (
								<ClearIcon
									onClick={() => handleClickOpen(item.title, item._id)}
									sx={{ ml: 1, cursor: 'pointer' }}
									color='error'
								/>
							)}
						</ListItem>
					)
				})}
				<Dialog
					open={modal.open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>Удалить {modal.title}?</DialogTitle>
					<DialogActions>
						<Button onClick={handleClose}>Нет</Button>
						<Button onClick={deleteDictionary}>Да</Button>
					</DialogActions>
				</Dialog>
			</List>
			<Button
				ref={buttonRef}
				variant='contained'
				color='primary'
				onClick={addNewWords}
				sx={{
					width: '250px',
					margin: 2,
					backgroundColor: 'secondary.main',
				}}
			>
				Добавить новые слова
			</Button>
			<NewWordsPopup
				onChange={saveWords}
				dictionaries={dictionaryList}
				loading={getDictionaryListLoading}
				open={isModalOpen}
				handleClose={closePopup}
			/>
		</Wrapper>
	)
}

export default DictionaryPage
