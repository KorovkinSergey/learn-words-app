import { useAuthContext } from '../context/AuthContext'
import { useHttp } from './useHttp'
import { useCallback } from 'react'

export const useLogin = () => {
	const { loading, error, request } = useHttp()
	const auth = useAuthContext()

	const loginHandler = useCallback(async (form: any) => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data)
		} catch (e) {
			console.log('e', e)
		}
	}, [request, auth])

	return { loginHandler, loading, error }
}
