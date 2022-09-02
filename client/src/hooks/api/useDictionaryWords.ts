import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { getQueryParams } from '../../helpers/getQueryParams'
import { path } from '../../consts/path'

export const useDictionaryWords = () => {
	const { loading, error, request } = useHttp()

	const getDictionaryWords = useCallback(
		(id: string, params?: { [key: string]: string }) => {
			try {
				const reqParams = getQueryParams(params)

				return request(`${path.dictionaryWords.replace(':id', id)}${reqParams}`)
			} catch (e) {
				console.log('e', e)
			}
		},
		[request]
	)

	return { getDictionaryWords, loading, error }
}
