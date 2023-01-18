import { useSettingsWordsContext } from '../context/SettingsWordsContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDictionaryWords } from './api/useDictionaryWords'
import { IWord } from '../types/word'

export interface IUseWords {
	loading: boolean
	word: string | undefined
	translateWord: string | undefined
	clear: () => void
}

let timeOut: string | number | NodeJS.Timer | undefined
let timeOutTranslate: string | number | NodeJS.Timer | undefined

export const useWords = (): IUseWords => {
	const { dictionary, countWords, translate, language, isShuffle } = useSettingsWordsContext()
	const { getDictionaryWords } = useDictionaryWords()
	const [words, setWords] = useState<IWord[]>([])
	const [loading, setLoading] = useState(true)
	const [word, setWord] = useState<IWord | null>(null)
	const [index, setIndex] = useState(0)

	const [showTranslateWord, setShowTranslateWord] = useState(false)

	const time = useMemo(() => (translate ? 120000 / countWords : 60000 / countWords), [countWords, translate])

	useEffect(() => {
		if (dictionary) {
			getDictionaryWords(dictionary._id).then((res: any) => {
				setWords(isShuffle ? res.words.sort(() => Math.random() - 0.5) : res.words)
				setLoading(false)
			})
		}
	}, [getDictionaryWords, dictionary, isShuffle])

	useEffect(() => {
		if (!word || !translate) return

		if (word === null && index === words.length) {
			clearTimeout(timeOutTranslate)
			return
		}
		timeOut = setTimeout(() => {
			setShowTranslateWord(true)
		}, time / 2)
		return () => clearTimeout(timeOutTranslate)
	}, [translate, word, index, time, words])

	useEffect(() => {
		if (!words.length) return
		if (word === null && index === words.length) {
			clearTimeout(timeOut)
			return
		}

		if (word === null && index === 0) {
			setWord(words[index])
			setIndex((prevState) => prevState + 1)
		}

		timeOut = setTimeout(() => {
			setShowTranslateWord(false)
			setWord(words[index])
			setIndex((prevState) => prevState + 1)
		}, time)

		return () => clearTimeout(timeOut)
	}, [words, index, word, time, language, translate])

	const clear = useCallback(() => {
		setWord(null)
		setIndex(0)
	}, [])

	return {
		loading,
		word: language === 'English' ? word?.english : word?.russian,
		translateWord: showTranslateWord ? (language !== 'English' ? word?.english : word?.russian) : undefined,
		clear,
	}
}
