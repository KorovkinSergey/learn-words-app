import { useSettingsWordsContext } from '../context/SettingsWordsContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDictionaryWords } from './api/useDictionaryWords'
import { IWord } from '../types/word'

export interface IUseWords {
	loading: boolean,
	word: IWord | null,
	clear: () => void
}


let timeOut: string | number | NodeJS.Timer | undefined

export const useWords = (): IUseWords => {
	const { dictionary, countWords } = useSettingsWordsContext()
	const { getDictionaryWords } = useDictionaryWords()
	const [words, setWords] = useState<IWord[]>([])
	const [loading, setLoading] = useState(true)
	const [word, setWord] = useState<IWord | null>(null)
	const [index, setIndex] = useState(0)

	const time = useMemo(() => 60000 / countWords, [countWords])
	useEffect(() => {
		if (dictionary) {
			getDictionaryWords(dictionary._id).then((res: any) => {
				setWords(res.words)
				setLoading(false)
			})
		}
	}, [getDictionaryWords, dictionary])

	useEffect(() => {
		if (!words.length) return
		if (word === null && index === words.length) {
			clearTimeout(timeOut)
			return
		}
		if (word === null && index === 0) {
			setWord(words[0])
			setIndex(prevState => prevState + 1)
		}
		timeOut = setTimeout(() => {
			setWord(words[index])
			setIndex(prevState => prevState + 1)
		}, time)

		return () => clearTimeout(timeOut)

	}, [words, index, word, time])

	const clear = useCallback(() => {
		setWord(null)
		setIndex(0)
	}, [])

	return {
		loading,
		word,
		clear,
	}
}
