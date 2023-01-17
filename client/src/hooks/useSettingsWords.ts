import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDictionaryList } from './api/useDictionaryList'
import { IDictionary } from './useAuth'

export interface IUseSettingsWords {
	dictionaryList: IDictionary[]
	dictionary: IDictionary | null
	loading: boolean
	setDictionary: Dispatch<SetStateAction<IDictionary | null>>
	translate: boolean
	setTranslate: Dispatch<SetStateAction<boolean>>
	isShuffle: boolean
	setIsShuffle: Dispatch<SetStateAction<boolean>>
	isVoice: boolean
	setIsVoice: Dispatch<SetStateAction<boolean>>
	countWords: number
	setCountWords: Dispatch<SetStateAction<number>>
	language: string
	setLanguage: Dispatch<SetStateAction<string>>
	init: () => void
}

export const useSettingsWords = (): IUseSettingsWords => {
	const { getDictionaryList } = useDictionaryList()
	const [dictionaryList, setDictionaryList] = useState<IDictionary[]>([])
	const [dictionary, setDictionary] = useState<IDictionary | null>(null)
	const [countWords, setCountWords] = useState(50)
	const [language, setLanguage] = useState('English')
	const [translate, setTranslate] = useState(false)
	const [isShuffle, setIsShuffle] = useState(false)
	const [isVoice, setIsVoice] = useState(false)

	const [loading, setLoading] = useState(true)

	const init = useCallback(() => {
		getDictionaryList().then((res: any) => {
			setDictionaryList(res.filter((item: any) => !item.basic))
			setLoading(false)
		})
	}, [getDictionaryList])

	return {
		loading,
		dictionary,
		dictionaryList,
		countWords,
		translate,
		setTranslate,
		isVoice,
		setIsVoice,
		isShuffle,
		setIsShuffle,
		setCountWords,
		setDictionary,
		language,
		setLanguage,
		init,
	}
}
