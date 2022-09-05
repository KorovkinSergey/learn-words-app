import React, { memo, useCallback } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Wrapper } from '../../components/Wrapper'


const TrainingPage = () => {
	const navigate = useNavigate()

	const handleRepeatTraining = useCallback(() => navigate('/training/learn/setting'), [navigate])

	const handleNewTraining = useCallback(() => navigate('/training/new/setting'), [navigate])

	const handleWordsTraining = useCallback(() => navigate('/training/words/setting'), [navigate])

	const buttons = [
		{
			title: 'Сортировка новых слов',
			onClick: handleNewTraining,
		},
		{
			title: 'Этап загрузки слов',
			onClick: handleRepeatTraining,
		},
		{
			title: 'Тренировка слов',
			onClick: handleWordsTraining,
		}]

	return (
		<Wrapper>
			{buttons.map(({ title, onClick }) => {
				return <Button
					key={title}
					variant='contained'
					color='primary'
					onClick={onClick}
					sx={{ width: '250px', margin: 2, backgroundColor: 'secondary.main' }}>
					{title}
				</Button>
			})}
		</Wrapper>
	)
}

export default memo(TrainingPage)
