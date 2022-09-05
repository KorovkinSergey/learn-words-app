import React from 'react'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useSortNewWords } from '../../hooks/useSortNewWords'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { Wrapper } from '../../components/Wrapper'
import { ChoiceGroupButtons } from '../../components/ChoiceGroupButtons'

const SortNewWordsPage = () => {
	const {
		loading,
		repeat,
		knowWords,
		handleIsKnow,
		handleIsNotKnow, saveLoading,
		word,
		index,
		clear,
		save,
	} = useSortNewWords()
	const navigate = useNavigate()

	if (loading || saveLoading) return <Loading />

	if (!loading && !word && !!index) {
		return (
			<Wrapper>
				<Typography sx={{ fontSize: 18, margin: 2 }} color='primary.contrastText'>
					Слова пройдены. {repeat.length} слов для изучения. {knowWords.length} слов знаешь.
				</Typography>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={() => {
						save().then(() => {
							navigate('/training')
						})
					}}
					sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
					Перейти к тренировкам
				</Button>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={clear}
					sx={{ margin: 2, maxWidth: '250px', backgroundColor: 'secondary.main' }}>
					Повторить
				</Button>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<Box sx={{ position: 'absolute', top: 2, right: 2 }}>
				<Typography sx={{ fontSize: 18, margin: 2 }} color='primary.contrastText'>
					Слово № {index}
				</Typography>
			</Box>
			<Typography sx={{ fontSize: 40, margin: 2 }} color='primary.contrastText'>
				{word?.english}
			</Typography>
			<ChoiceGroupButtons
				succsesTitle='Знаю'
				succsesOnClick={handleIsKnow}
				rejectTitle='Не знаю'
				rejectOnClick={handleIsNotKnow}
			/>
		</Wrapper>
	)
}

export default SortNewWordsPage
