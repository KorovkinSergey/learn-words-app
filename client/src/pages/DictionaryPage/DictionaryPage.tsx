import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Folder } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAddWordsToDictionary } from '../../hooks/api/useAddWordsToDictionary'
import { Loading } from '../../components/Loading'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { useAuthContext } from '../../context/AuthContext'
import { Wrapper } from '../../components/Wrapper'
import db from '../../db/new.json'
import { Title } from '../../components/Title'

const DictionaryPage = () => {
	const { addWordsHandler } = useAddWordsToDictionary()
	const { dictionary, token } = useAuthContext()
	const { getDictionaryList, loading } = useDictionaryList()
	const [dictionaryList, setDictionaryList] = useState([])

	useEffect(() => {
		getDictionaryList().then(setDictionaryList)
	}, [getDictionaryList, token])

	const addNewWords = async () => {
		if (!dictionary) return
		await addWordsHandler(dictionary[0]._id, db)
	}

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
								<ListItemText
									sx={{ color: 'white' }}
									primary={item.title}
								/>
							</Link>
						</ListItem>
					)
				})}
			</List>
			<Button
				variant='contained'
				color='primary'
				onClick={addNewWords}
				sx={{
					width: '250px',
					margin: 2,
					backgroundColor: 'secondary.main',
				}}>
				Добавить новые слова
			</Button>
		</Wrapper>
	)
}

export default DictionaryPage
