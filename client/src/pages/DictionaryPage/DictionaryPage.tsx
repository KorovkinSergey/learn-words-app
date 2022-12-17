import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { useAuthContext } from '../../context/AuthContext'
import { Wrapper } from '../../components/Wrapper'
import { Title } from '../../components/Title'
import NewWordsPopup from '../../components/NewWordsPopup/NewWordsPopup'
import { useNewDictionaryList } from '../../hooks/api/useNewDictionaryList'
import { IDictionariesList } from '../../types/dictionary'
import { useAddNewWordsToDictionary } from '../../hooks/api/useAddNewWordsToDictionary'

const DictionaryPage = () => {
	const { dictionary, token } = useAuthContext()
	const { getDictionaryList: getUserDictionaries, loading } = useDictionaryList()
	const { getNewDictionaryList: getDictionaryList, loading: getDictionaryListLoading } = useNewDictionaryList()
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
						</ListItem>
					)
				})}
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
