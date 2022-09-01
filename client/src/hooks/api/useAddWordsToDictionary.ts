import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { IWord } from '../../types/word'
import { path } from '../../consts/path'

export const useAddWordsToDictionary = () => {
  const { loading, error, request } = useHttp()

  const addWordsHandler = useCallback((id: string, words: IWord[]) => {
    try {
      return request(path.dictionaryWords.replace(':id', id), 'POST', { words })
    } catch (e) {
      console.log('e', e)
    }
  }, [request])

  return { addWordsHandler, loading, error }
}
