import { useHttp } from './useHttp'
import { useCallback } from 'react'
import { IWord } from '../types/word'


export const useRemoveWordsToDictionary = () => {
  const { loading, error, request } = useHttp()

  const deleteHandler = useCallback(async (dictionary: string, words?: IWord[]) => {
    try {
      return request(`/api/dictionary/${dictionary}`, 'DELETE', { words })
    } catch (e) {
      console.log('e', e)
    }
  }, [request])

  return { deleteHandler, loading, error }
}
