import React from 'react'
import { useWords } from '../../hooks/useWords'
import { Loading } from '../../components/Loading'
import { Button, Typography } from '@mui/material'
import { Wrapper } from '../../components/Wrapper'
import { useNavigate } from 'react-router-dom'
import { useSettingsWordsContext } from '../../context/SettingsWordsContext'

const TrainingWordsPage = () => {
	const { word, loading, clear } = useWords()
	const { language } = useSettingsWordsContext()
	const navigate = useNavigate()

	const handleNavigateToSettings = () => navigate('/training/words/setting')
	if (loading) return <Loading />

	if (!loading && !word) {
		return (
			<Wrapper>
				<Typography sx={{ fontSize: 40 }} color='primary.contrastText'>
					Слова закончились
				</Typography>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={clear}
					sx={{ margin: 2, maxWidth: 250, backgroundColor: 'secondary.main' }}
				>
					Заново
				</Button>
				<Button
					variant='contained'
					color='primary'
					fullWidth
					onClick={handleNavigateToSettings}
					sx={{ margin: 2, maxWidth: 250, backgroundColor: 'secondary.main' }}
				>
					Перейти к настройкам
				</Button>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<Typography sx={{ fontSize: 54 }} color='primary.contrastText'>
				{language === 'English' ? word?.english : word?.russian}
			</Typography>
		</Wrapper>
	)
}

export default TrainingWordsPage
