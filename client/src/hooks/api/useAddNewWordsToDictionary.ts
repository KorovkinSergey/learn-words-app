import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useAddNewWordsToDictionary = () => {
	const { loading, error, request } = useHttp()

	const addNewWordsHandler = useCallback(
		(dictionaries: string[]) => {
			try {
				return request(endpoints.newDictionaries, 'POST', { dictionaries })
			} catch (e) {
				console.log('e', e)
			}
		},
		[request],
	)

	return { addNewWordsHandler, loading, error }
}
