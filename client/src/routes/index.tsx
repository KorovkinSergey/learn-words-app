import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { TrainingPage } from '../pages/TrainingPage'
import { DictionaryPage } from '../pages/DictionaryPage'
import { TrainingNewWordsPage } from '../pages/SortNewWordsPage'
import { TrainingNewWordsSettingsPage } from '../pages/SortNewWordsSettingsPage'
import { LearnWordsPage } from '../pages/LearnWordsPage'
import { WordsTable } from '../components/WordsTable'
import { LearnWordsSettingsPage } from '../pages/LearnWordsSettingsPage'
import { TrainingWordsPage } from '../pages/TrainingWordsPage'
import { TrainingWordsSettingsPage } from '../pages/TrainingWordsSettingsPage'

export const useRoutes = (isAuthenticated: boolean) => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/training' element={<TrainingPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/training/learn' element={<LearnWordsPage />} />
				<Route path='/training/learn/setting' element={<LearnWordsSettingsPage />} />
				<Route path='/training/new' element={<TrainingNewWordsPage />} />
				<Route path='/training/new/setting' element={<TrainingNewWordsSettingsPage />} />
				<Route path='/training/words' element={<TrainingWordsPage />} />
				<Route path='/training/words/setting' element={<TrainingWordsSettingsPage />} />
				<Route path='/dictionary' element={<DictionaryPage />} />
				<Route path='/dictionary/:dictionary' element={<WordsTable />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path='*' element={<AuthPage />} />
		</Routes>
	)
}
