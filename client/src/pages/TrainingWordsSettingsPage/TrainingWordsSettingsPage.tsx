import React, { useCallback, useEffect } from 'react'
import { useSettingsWordsContext } from '../../context/SettingsWordsContext'
import { Wrapper } from '../../components/Wrapper'
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Slider,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material'
import { Loading } from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const TrainingWordsSettingsPage = () => {
	// eslint-disable-next-line max-len
	const { loading, language, setLanguage, dictionary, dictionaryList, setDictionary, init, countWords, setCountWords } =
		useSettingsWordsContext()
	const navigate = useNavigate()

	useEffect(() => {
		init()
	}, [init])

	const handleStartTraining = useCallback(() => navigate('/training/words'), [navigate])
	const handleCountWords = (event: Event, newValue: number | number[]) => setCountWords(newValue as number)
	const handleChange = (event: SelectChangeEvent) => {
		setDictionary(dictionaryList.find((item) => item.title === event.target.value) || null)
	}

	const handleChangeLanguage = (event: React.MouseEvent<HTMLElement>, value: string) => {
		setLanguage(value ? value : language)
	}

	if (loading) return <Loading />

	if (!dictionaryList.length) {
		return (
			<Wrapper>
				<Typography sx={{ fontSize: 24, mt: 2, mb: 4 }} color='primary.contrastText'>
					Словарей пока нет
				</Typography>
			</Wrapper>
		)
	}

	return (
		<Wrapper top>
			<Typography sx={{ fontSize: 24, mt: 2, mb: 4 }} color='primary.contrastText'>
				Выберете словарь для тренировки
			</Typography>
			<FormControl fullWidth>
				<InputLabel sx={{ color: 'primary.contrastText' }} id='demo-select-small'>
					Словарь
				</InputLabel>
				<Select
					sx={{ color: 'primary.contrastText', width: '100%' }}
					labelId='demo-select-small'
					id='demo-select-small'
					value={dictionary?.title || ''}
					onChange={handleChange}
					label='Словарь'
					variant='outlined'
				>
					{dictionaryList.map(({ title, _id }) => (
						<MenuItem key={_id} value={title}>
							{title}
						</MenuItem>
					))}
				</Select>
				<ToggleButtonGroup
					color='warning'
					fullWidth
					sx={{ mt: 2, mb: 2 }}
					value={language}
					exclusive
					onChange={handleChangeLanguage}
				>
					<ToggleButton sx={{ color: 'white' }} value='English'>
						English
					</ToggleButton>
					<ToggleButton sx={{ color: 'white' }} value='Russian'>
						Russian
					</ToggleButton>
				</ToggleButtonGroup>
			</FormControl>

			<Typography sx={{ fontSize: 16, mt: 4 }} color='primary.contrastText'>
				Количество слов в минуту {countWords}
			</Typography>
			<Slider
				color='secondary'
				step={10}
				marks
				min={10}
				max={400}
				aria-label='Volume'
				value={countWords}
				onChange={handleCountWords}
			/>

			<Button
				fullWidth
				variant='contained'
				onClick={handleStartTraining}
				disabled={!dictionary?.title}
				sx={{ backgroundColor: 'secondary.main', mt: 4 }}
			>
				Старт
			</Button>
		</Wrapper>
	)
}

export default TrainingWordsSettingsPage
