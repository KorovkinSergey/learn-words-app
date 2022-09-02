import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { IWord } from '../../types/word'
import { path } from '../../consts/path'

export const useRemoveWordsToDictionary = () => {
	const { loading, error, request } = useHttp()

	const deleteHandler = useCallback(
		(id: string, words: IWord[]) => {
			try {
				return request(path.dictionaryWords.replace(':id', id), 'DELETE', { words })
			} catch (e) {
				console.log('e', e)
			}
		},
		[request]
	)

	return { deleteHandler, loading, error }
}
