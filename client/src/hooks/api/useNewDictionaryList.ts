import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useNewDictionaryList = () => {
	const { loading, error, request } = useHttp()

	const getNewDictionaryList = useCallback(() => {
		try {
			return request(endpoints.newDictionaries)
		} catch (e) {
			console.log('e', e)
		}
	}, [request])

	return { getNewDictionaryList, loading, error }
}
