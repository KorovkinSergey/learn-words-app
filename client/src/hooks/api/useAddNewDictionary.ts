import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { IWord } from '../../types/word'
import { path } from '../../consts/path'

export const useAddNewDictionary = () => {
	const { loading, error, request } = useHttp()

	const addDictionaryHandler = useCallback((title: string, words: IWord[]) => {
		try {
			return request(path.dictionary, 'POST', { title, words })
		} catch (e) {
			console.log('e', e)
		}
	}, [request])

	return { addDictionaryHandler, loading, error }
}
