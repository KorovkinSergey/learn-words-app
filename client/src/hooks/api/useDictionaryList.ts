import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { path } from '../../consts/path'

export const useDictionaryList = () => {
	const { loading, error, request } = useHttp()

	const getDictionaryList = useCallback(() => {
		try {
			return request(path.dictionary)
		} catch (e) {
			console.log('e', e)
		}
	}, [request])

	return { getDictionaryList, loading, error }
}
