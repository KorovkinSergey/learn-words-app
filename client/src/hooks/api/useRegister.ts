import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useRegister = () => {
	const { loading, error, request } = useHttp()

	const registerHandler = useCallback(async (form: any) => {
		try {
			return request(endpoints.register, 'POST', { ...form })
		} catch (e: any) {
			throw e
		}
	}, [request])

	return { registerHandler, loading, error }
}
