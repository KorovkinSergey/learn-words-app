import React, { useCallback, useEffect, useState } from 'react'
import { useDictionaryList } from './api/useDictionaryList'

export interface IUseSettingsLearnWords {
	countWords: number
	setCountWords: React.Dispatch<React.SetStateAction<number>>
	timeToRemember: number
	setTimeToRemember: React.Dispatch<React.SetStateAction<number>>
	titleTable: string
	setTitleTable: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	error: string
	init: () => void
}

export const useSettingsLearnWords = (): IUseSettingsLearnWords => {
	const { getDictionaryList } = useDictionaryList()
	const [countWords, setCountWords] = useState(5)
	const [timeToRemember, setTimeToRemember] = useState(2)
	const [titleTable, setTitleTable] = useState('')
	const [dictionary, setDictionary] = useState<string[]>([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)

	const init = useCallback(() => {
		getDictionaryList().then((res: any) => {
			setDictionary(res.map((item: any) => item.title))
			setTitleTable(`Таблица ${res.length - 3}`)
			setLoading(false)
		})
	}, [getDictionaryList])
	useEffect(() => {
		setError('')
		if (dictionary.includes(titleTable)) {
			setError('Такой словарь уже существует')
		}
	}, [titleTable, dictionary])

	return {
		loading,
		error,
		countWords,
		setCountWords,
		timeToRemember,
		setTimeToRemember,
		titleTable,
		setTitleTable,
		init,
	}
}
