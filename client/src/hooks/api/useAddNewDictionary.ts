import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { IWord } from '../../types/word'
import { endpoints } from '../../consts/endpoints'

export const useAddNewDictionary = () => {
	const { loading, error, request } = useHttp()

	const addDictionaryHandler = useCallback((title: string, words: IWord[]) => {
		try {
			return request(endpoints.dictionary, 'POST', { title, words })
		} catch (e) {
			console.log('e', e)
		}
	}, [request])

	return { addDictionaryHandler, loading, error }
}
