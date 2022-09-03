import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Wrapper } from '../../components/Wrapper'


const TrainingPage = () => {
	const navigate = useNavigate()

	const handleRepeatTraining = () => navigate('/training/learn/setting')

	const handleNewTraining = () => navigate('/training/new/setting')

	const handleWordsTraining = () => navigate('/training/words/setting')

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

export default TrainingPage
