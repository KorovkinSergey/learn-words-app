import { useHttp } from './useHttp'
import { useCallback } from 'react'
import { getQueryParams } from '../helpers/getQueryParams'

export const useDictionary = () => {
  const { loading, error, request } = useHttp()

  const requestHandler = useCallback(async (dictionary: string, params?: { [key: string]: string }) => {
    try {
      const reqParams = getQueryParams(params)

      return request(`/api/dictionary/${dictionary}${reqParams}`)

    } catch (e) {
      console.log('e', e)
    }
  }, [request])

  return { requestHandler, loading, error }
}
