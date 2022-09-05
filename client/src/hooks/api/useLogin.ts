import { useAuthContext } from '../../context/AuthContext'
import { useHttp } from '../useHttp'
import { useCallback } from 'react'
import { endpoints } from '../../consts/endpoints'

export const useLogin = () => {
	const { loading, error, request } = useHttp()
	const auth = useAuthContext()

	const loginHandler = useCallback(async (form: any) => {
		try {
			const data = await request(endpoints.login, 'POST', { ...form })
			auth.login(data)
		} catch (e) {
			throw e
		}
	}, [request, auth])

	return { loginHandler, loading, error }
}
