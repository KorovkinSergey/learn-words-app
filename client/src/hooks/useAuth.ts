import { useCallback, useEffect, useState } from 'react'
import { IWord } from '../types/word'

const storageName = 'userData'

export interface IUseAuth {
	login: (userData: IData) => void
	logout: () => void
	token: string
	data: IData | null
	isAuthenticated: boolean
	dictionary: IDictionary[] | null
}

interface IData {
	token: string
	dictionary: IDictionary[]
	user: {
		id: string
		name: string
		achievements: {
			wordsLearned: number
			wordsOnRepeat: number
		}
	}
}

export interface IDictionary {
	_id: string
	title: string
	words: IWord[]
}

export const useAuth = (): IUseAuth => {
	const [token, setToken] = useState('')
	const [data, setData] = useState<IData | null>(null)
	const [dictionary, setDictionary] = useState<IDictionary[] | null>(null)

	const login = useCallback((userData: IData) => {
		setToken(userData.token)
		setDictionary(userData.dictionary)
		setData(userData)
		localStorage.setItem(
			storageName,
			JSON.stringify({
				...userData,
			})
		)
	}, [])

	useEffect(() => {
		const localData = localStorage.getItem(storageName)
		const data = localData ? JSON.parse(localData) : null
		if (data && data.token) {
			login(data)
		}
	}, [login])

	const logout = useCallback(() => {
		setToken('')
		setData(null)
		localStorage.removeItem(storageName)
	}, [])

	const isAuthenticated = !!token

	return { login, logout, token, data, dictionary, isAuthenticated }
}
