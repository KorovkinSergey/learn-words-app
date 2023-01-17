import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useLearnWords } from '../../hooks/useLearnWords'
import { Loading } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import { NavigateButtons } from '../../components/NavigateButtons'
import { Wrapper } from '../../components/Wrapper'
import { ChoiceGroupButtons } from '../../components/ChoiceGroupButtons'
import CloseIcon from '@mui/icons-material/Close'
import { useSpeakText } from '../../hooks/useSpeakText'

function LearnWordsPage() {
	const {
		loading,
		isLoading,
		word,
		index,
		bootSelection,
		addToLoaded,
		addToNotLoaded,
		loadedWords,
		notLoadedWords,
		clear,
		save,
	} = useLearnWords()
	const navigate = useNavigate()

	const { speak } = useSpeakText()

	const onSave = useCallback(() => {
		save().then(() => {
			navigate('/training')
		})
	}, [save, navigate])

	if (loading || isLoading) return <Loading />

	if (!loading && !word && !!index) {
		return (
			<NavigateButtons
				title={`Слова пройдены. ${loadedWords.length} слов загружено. ${notLoadedWords.length} слов на потом`}
				onSave={onSave}
				repeat={clear}
			/>
		)
	}

	return (
		<Wrapper>
			{!bootSelection ? (
				<>
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
					<VolumeUpIcon
						sx={{ color: 'primary.contrastText', margin: 2 }}
						fontSize='large'
						onClick={() => {
							console.log('asdads')
							speak(word?.english || '')
						}}
					/>
					<Button
						size='large'
						variant='contained'
						color='error'
						startIcon={<CloseIcon />}
						onClick={addToNotLoaded}
						sx={{ m: 2 }}
					>
						Пропустить
					</Button>
				</>
			) : (
				<ChoiceGroupButtons
					succsesTitle='Слово загружено'
					succsesOnClick={addToLoaded}
					rejectTitle='Слово не загружено'
					rejectOnClick={addToNotLoaded}
				/>
			)}
		</Wrapper>
	)
}

export default LearnWordsPage
