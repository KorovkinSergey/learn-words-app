import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useRemoveDictionary = () => {
	const { loading, error, request } = useHttp()

	const deleteHandler = useCallback(
		(id: string) => {
			try {
				return request(endpoints.dictionaryId.replace(':id', id), 'DELETE')
			} catch (e) {
				console.log('e', e)
			}
		},
		[request],
	)

	return { deleteHandler, loading, error }
}
