import { useSettingsLearnWords } from './useSettingsLearnWords'
import { useCallback, useEffect, useReducer } from 'react'
import { useRemoveWordsToDictionary } from './api/useRemoveWordsToDictionary'
import { useAddWordsToDictionary } from './api/useAddWordsToDictionary'
import { useAuthContext } from '../context/AuthContext'
import { useDictionaryWords } from './api/useDictionaryWords'

const actionTypes = {
  FIRST_WORD: 'FIRST_WORD',
  LAST_WORD: 'LAST_WORD',
  NEXT_WORD: 'NEXT_WORD',
  ADD_WORDS: 'ADD_WORDS',
  CLEAR: 'CLEAR',
  IS_LOADING: 'IS_LOADING',
}

const DEFAULT_STATE = {
  index: 0,
  word: null,
  isLoading: false,
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.FIRST_WORD:
      return { ...state, word: state.words[state.index], index: state.index + 1, }
    case actionTypes.LAST_WORD:
      return { ...state, repeat: [...state.repeat, state.word], word: null }
    case actionTypes.NEXT_WORD:
      return {
        ...state,
        word: state.words[state.index] ? state.words[state.index] : null,
        index: state.index + 1,
        repeat: [...state.repeat, state.word]
      }
    case actionTypes.ADD_WORDS:
      return { ...state, words: action.words }
    case actionTypes.CLEAR:
      return { ...DEFAULT_STATE, words: state.words }
    case actionTypes.IS_LOADING:
      return { ...DEFAULT_STATE, isLoading: !state.isLoading }
    default:
      return state
  }
}

let interval: string | number | NodeJS.Timer | undefined
let timeOut: string | number | NodeJS.Timer | undefined


export interface IUseLearnWords {
  loading: boolean,
  isLoading: boolean,
  save: () => Promise<void>,
}


export const useLearnWords = (): IUseLearnWords => {

  const { countWords, timeToRemember } = useSettingsLearnWords()
  const { dictionary } = useAuthContext()
  const { deleteHandler } = useRemoveWordsToDictionary()
  const { getDictionaryWords, loading } = useDictionaryWords()
  const { addWordsHandler } = useAddWordsToDictionary()
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

  const { word, words, index, isLoading } = state

  useEffect(() => {
    if (!dictionary) return
    getDictionaryWords(dictionary[0]._id, { _limit: countWords.toString() }).then((words: any) => {
      dispatch({ type: actionTypes.ADD_WORDS, words })
    })
  }, [timeToRemember, dictionary, countWords, getDictionaryWords])

  useEffect(() => {
    if (!words.length) return
    if (word === null && index === words.length) {
      clearInterval(interval)
      clearTimeout(timeOut)
      return
    }

    if (words.length === index) {
      timeOut = setTimeout(() => {
        dispatch({ type: actionTypes.LAST_WORD })
        clearInterval(interval)
      }, timeToRemember * 1000)
      return () => clearInterval(interval)
    }

    if (word === null && index === 0) dispatch({ type: actionTypes.FIRST_WORD })

    interval = setInterval(() => dispatch({ type: actionTypes.NEXT_WORD }), timeToRemember * 1000)

    return () => clearInterval(interval)

  }, [words, word, index, timeToRemember])

  const save = useCallback(async () => {
    if (!dictionary) return
    dispatch({ type: actionTypes.IS_LOADING })
    await addWordsHandler(dictionary[2]._id, words)
    await deleteHandler(dictionary[1]._id, words).then((r: any) => console.log('remove word', r))
    dispatch({ type: actionTypes.IS_LOADING })
  }, [addWordsHandler, dictionary, words, deleteHandler])

  return {
    loading,
    isLoading,
    save
  }
}
