import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useDictionaryList = () => {
	const { loading, error, request } = useHttp()

	const getDictionaryList = useCallback(() => {
		try {
			return request(endpoints.dictionary)
		} catch (e) {
			console.log('e', e)
		}
	}, [request])

	return { getDictionaryList, loading, error }
}
