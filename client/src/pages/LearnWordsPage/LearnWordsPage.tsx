import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import { useLearnWords } from '../../hooks/useLearnWords'
import { Loading } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { NavigateButtons } from '../../components/NavigateButtons'


function LearnWordsPage() {
	const {
		loading, isLoading, word, index, bootSelection, addToLoaded,
		addToNotLoaded,
		loadedWords,
		notLoadedWords,
		clear,
		save,
	} = useLearnWords()
	const navigate = useNavigate()

	const onSave = useCallback(() => {
		save().then(() => {
			navigate('/training')
		})
	}, [save, navigate])
	
	if (loading || isLoading) return <Loading />

	if (!loading && !word && !!index) {
		return <NavigateButtons
			title={`Слова пройдены. ${loadedWords.length} слов загружено. ${notLoadedWords.length} слов знаешь.`}
			onSave={onSave}
			repeat={clear}
		/>
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			flex: '1 1 auto',
			alignItems: 'center',
			position: 'relative',
			padding: 4,
		}}>
			{!bootSelection ? <>
				<Box sx={{ position: 'absolute', top: 2, right: 2 }}>
					<Typography sx={{ fontSize: 18, margin: 2 }} color='primary.contrastText'>
						Слово № {index}
					</Typography>
				</Box>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.russian}
				</Typography>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.transcript}
				</Typography>
				<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
					{word?.english}
				</Typography>
				<Box sx={{
					display: 'flex',
					alignItems: 'center',
					mt: 4,
					minWidth: '300px',
					justifyContent: 'space-between',
				}}>
				</Box>
			</> : <>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={addToLoaded}
					sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
					Слово загружено
				</Button>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={addToNotLoaded}
					sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
					Слово не загружено
				</Button>
			</>
			}
		</Box>
	)
}

export default LearnWordsPage
