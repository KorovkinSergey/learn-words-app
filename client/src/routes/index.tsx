import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { HomePage } from '../pages/HomePage'
import { TrainingPage } from '../pages/TrainingPage'
import { DictionaryPage } from '../pages/DictionaryPage'
import { TrainingNewWordsPage } from '../pages/TrainingNewWordsPage'
import { TrainingNewWordsSettingsPage } from '../pages/TrainingNewWordsSettingsPage'
import { LearnWordsPage } from '../pages/LearnWordsPage'
import { WordsTable } from '../components/WordsTable'
import { LearnWordsSettingsPage } from '../pages/LearnWordsSettingsPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/training" element={<TrainingPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/training/learn/setting" element={<LearnWordsSettingsPage/>}/>
        <Route path="/training/learn" element={<LearnWordsPage/>}/>
        <Route path="/training/new/setting" element={<TrainingNewWordsSettingsPage/>}/>
        <Route path="/training/new" element={<TrainingNewWordsPage/>}/>
        <Route path="/dictionary" element={<DictionaryPage/>}/>
        <Route path="/dictionary/:dictionary" element={<WordsTable/>}/>
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="*" element={<AuthPage/>}/>
    </Routes>
  )
}
