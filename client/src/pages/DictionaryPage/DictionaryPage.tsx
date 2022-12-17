import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { useAuthContext } from '../../context/AuthContext'
import { Wrapper } from '../../components/Wrapper'
import { Title } from '../../components/Title'
import Popup from '../../components/Popup/Popup'

const DictionaryPage = () => {
	// const { addWordsHandler } = useAddWordsToDictionary()
	const { dictionary, token } = useAuthContext()
	const { getDictionaryList, loading } = useDictionaryList()
	const [dictionaryList, setDictionaryList] = useState([])
	const buttonRef = useRef(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const closePopup = useCallback(() => setIsModalOpen(false), [setIsModalOpen])

	useEffect(() => {
		getDictionaryList().then(setDictionaryList)
	}, [getDictionaryList, token])

	const addNewWords = async () => {
		if (!dictionary) return

		setIsModalOpen(true)

		// await addWordsHandler(dictionary[0]._id, db)
	}

	// TODO: FIXME
	if (loading)
		return (
			<Button
				onClick={() => {
					console.log('qwewe')
				}}
			/>
		)

	if (loading) return <Loading />

	return (
		<Wrapper>
			<Title title='Список словарей' />
			<List>
				{dictionaryList.map((item: any) => {
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
			<Popup open={isModalOpen} handleClose={closePopup}>
				<Title title='sraka' />
			</Popup>
		</Wrapper>
	)
}

export default DictionaryPage
