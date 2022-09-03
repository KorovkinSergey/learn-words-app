import React, { useEffect, useState } from 'react'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import { Link } from 'react-router-dom'
import db from '../../db/new.json'
import { useAddWordsToDictionary } from '../../hooks/api/useAddWordsToDictionary'
import { Loading } from '../../components/Loading'
import { useDictionaryList } from '../../hooks/api/useDictionaryList'
import { useAuthContext } from '../../context/AuthContext'
import { Wrapper } from '../../components/Wrapper'

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
	const deleteAllWords = () => {
		console.log('delete')
	}

	if (loading) return <Loading />

	return (
		<Wrapper>
			<Typography sx={{ mt: 4, mb: 2, ml: 2 }} color='white' variant='h6' component='div'>
				Список словарей
			</Typography>
			<List>
				{dictionaryList.map((item: any) => {
					return (
						<ListItem key={item._id} sx={{ '& > a': { textDecoration: 'none' } }}>
							<ListItemAvatar>
								<Avatar>
									<FolderIcon />
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
			<Button
				variant='contained'
				color='primary'
				onClick={deleteAllWords}
				sx={{
					width: '250px',
					margin: 2,
					backgroundColor: 'secondary.main',
				}}>
				Очистить словари
			</Button>
		</Wrapper>
	)
}

export default DictionaryPage
