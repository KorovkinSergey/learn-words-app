import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsSortNewWordsContext } from '../../context/SettingsSortNewWordsContext'
import { Wrapper } from '../../components/Wrapper'
import { SliderInput } from '../../components/SliderInput'
import { StartButton } from '../../components/StartButton'
import { Title } from '../../components/Title'

function SortNewWordsSettingsPage() {
	const navigate = useNavigate()
	const { timeToRemember, countWords, setCountWords, setTimeToRemember } = useSettingsSortNewWordsContext()

	const handleTimeToRemember = useCallback((event: Event, newValue: number | number[]) =>
		setTimeToRemember(newValue as number), [setTimeToRemember])

	const handleCountWords = useCallback((event: Event, newValue: number | number[]) =>
		setCountWords(newValue as number), [setCountWords])

	const handleStartTraining = useCallback(() => navigate('/training/new'), [navigate])

	return (
		<Wrapper>

			<Title title='Настройки для изучения новых слов' />

			<SliderInput
				title='Время на вспоминание слова'
				value={timeToRemember}
				onChange={handleTimeToRemember}
				step={1}
				min={1}
				max={10}
			/>

			<SliderInput
				title='Количество слов'
				value={countWords}
				onChange={handleCountWords}
				step={5}
				min={5}
				max={1000}
			/>

			<StartButton onClick={handleStartTraining} />

		</Wrapper>
	)
}

export default SortNewWordsSettingsPage
