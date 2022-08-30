import { useHttp } from './useHttp'
import { useCallback } from 'react'

export const useRegister = () => {
  const { loading, error, request } = useHttp()

  const registerHandler = useCallback(async (form: any) => {
    try {
      await request('/api/auth/register', 'POST', { ...form })

    } catch (e: any) {
      throw e
    }
  }, [request])

  return { registerHandler, loading, error }
}
