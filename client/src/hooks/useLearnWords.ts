import { useCallback, useEffect, useReducer } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useDictionaryWords } from './api/useDictionaryWords'
import { IWord } from '../types/word'
import { useSettingsLearnWordsContext } from '../context/SettingsLearnWordsContext'
import { useRemoveWordsToDictionary } from './api/useRemoveWordsToDictionary'
import { useAddNewDictionary } from './api/useAddNewDictionary'
import { useAddWordsToDictionary } from './api/useAddWordsToDictionary'

const actionTypes = {
	FIRST_WORD: 'FIRST_WORD',
	LAST_WORD: 'LAST_WORD',
	NEXT_WORD: 'NEXT_WORD',
	ADD_WORDS: 'ADD_WORDS',
	ADD_TO_NOT_LOADED_WORDS: 'ADD_TO_NOT_LOADED_WORDS',
	ADD_TO_LOADED_WORDS: 'ADD_TO_LOADED_WORDS',
	CLEAR: 'CLEAR',
	IS_LOADING: 'IS_LOADING',
}

const DEFAULT_STATE = {
	index: 0,
	word: null,
	isLoading: false,
	loadedWords: [],
	notLoadedWords: [],
	words: [],
	bootSelection: false,
}

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case actionTypes.FIRST_WORD:
			return { ...state, word: state.words[state.index], index: state.index + 1 }
		case actionTypes.LAST_WORD:
			return { ...state, word: null }
		case actionTypes.NEXT_WORD:
			return { ...state, bootSelection: true }
		case actionTypes.ADD_WORDS:
			return { ...state, words: action.words }
		case actionTypes.ADD_TO_NOT_LOADED_WORDS:
			return {
				...state,
				notLoadedWords: [...state.notLoadedWords, state.word],
				bootSelection: false,
				word: state.words[state.index] ? state.words[state.index] : null,
				index: state.index + 1,
			}
		case actionTypes.ADD_TO_LOADED_WORDS:
			return {
				...state,
				loadedWords: [...state.loadedWords, state.word],
				bootSelection: false,
				word: state.words[state.index] ? state.words[state.index] : null,
				index: state.index + 1,
			}
		case actionTypes.CLEAR:
			return { ...DEFAULT_STATE, words: state.words }
		case actionTypes.IS_LOADING:
			return { ...DEFAULT_STATE, isLoading: !state.isLoading }
		default:
			return state
	}
}

let timeOut: string | number | NodeJS.Timer | undefined

export interface IUseLearnWords {
	loading: boolean,
	isLoading: boolean,
	save: () => Promise<void>,
	word: IWord,
	index: number,
	loadedWords: IWord[],
	notLoadedWords: IWord[],
	addToLoaded: () => void,
	addToNotLoaded: () => void,
	bootSelection: boolean,
	clear: () => void
}

export const useLearnWords = (): IUseLearnWords => {

	const { countWords, timeToRemember, titleTable } = useSettingsLearnWordsContext()
	const { dictionary } = useAuthContext()
	const { deleteHandler } = useRemoveWordsToDictionary()
	const { getDictionaryWords, loading } = useDictionaryWords()
	const { addDictionaryHandler } = useAddNewDictionary()
	const { addWordsHandler } = useAddWordsToDictionary()
	const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

	const { word, words, index, isLoading, loadedWords, notLoadedWords, bootSelection } = state

	useEffect(() => {
		if (!dictionary) return
		getDictionaryWords(dictionary[1]._id, { _limit: countWords.toString() }).then(({ words }: any) => {
			dispatch({ type: actionTypes.ADD_WORDS, words })
		})
	}, [timeToRemember, dictionary, countWords, getDictionaryWords])

	useEffect(() => {
		if (!words.length) return

		if (word === null && index === words.length) {
			clearTimeout(timeOut)
			return
		}
		if (word === null && index === 0) {
			dispatch({ type: actionTypes.FIRST_WORD })
		}
		if (!bootSelection) {
			timeOut = setTimeout(() => {
				dispatch({ type: actionTypes.NEXT_WORD })
			}, timeToRemember * 1000)
		}

		return () => clearTimeout(timeOut)

	}, [words, word, index, timeToRemember, bootSelection])

	const save = useCallback(async () => {
		if (!dictionary) return
		dispatch({ type: actionTypes.IS_LOADING })
		await addDictionaryHandler(titleTable, loadedWords)
		await deleteHandler(dictionary[1]._id, words)
		await addWordsHandler(dictionary[1]._id, notLoadedWords)
		dispatch({ type: actionTypes.IS_LOADING })
	}, [
		loadedWords,
		notLoadedWords,
		titleTable,
		addDictionaryHandler,
		deleteHandler,
		dictionary,
		words,
		addWordsHandler,
	])

	const addToLoaded = useCallback(() => {
		dispatch({ type: actionTypes.ADD_TO_LOADED_WORDS })
	}, [])
	const addToNotLoaded = useCallback(() => {
		dispatch({ type: actionTypes.ADD_TO_NOT_LOADED_WORDS })
	}, [])

	const clear = useCallback(() => dispatch({ type: actionTypes.CLEAR }), [])

	return {
		loading,
		isLoading,
		save,
		word,
		index,
		addToLoaded,
		addToNotLoaded,
		loadedWords,
		notLoadedWords,
		bootSelection,
		clear,
	}
}
