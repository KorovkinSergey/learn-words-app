import React, { useState } from 'react'

export interface IUseSettingsLearnWords {
  countWords: number,
  setCountWords: React.Dispatch<React.SetStateAction<number>>
  timeToRemember: number,
  setTimeToRemember: React.Dispatch<React.SetStateAction<number>>
  titleTable: string,
  setTitleTable: React.Dispatch<React.SetStateAction<string>>
}

export const useSettingsLearnWords = (): IUseSettingsLearnWords => {
  const [countWords, setCountWords] = useState(5)
  const [timeToRemember, setTimeToRemember] = useState(2)
  const [titleTable, setTitleTable] = useState('Таблица 1')

  return {
    countWords,
    setCountWords,
    timeToRemember,
    setTimeToRemember,
    titleTable,
    setTitleTable
  }
}
