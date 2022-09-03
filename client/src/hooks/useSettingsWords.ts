import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDictionaryList } from './api/useDictionaryList'
import { IDictionary } from './useAuth'

export interface IUseSettingsWords {
	dictionaryList: IDictionary[],
	dictionary: IDictionary | null,
	loading: boolean,
	setDictionary: Dispatch<SetStateAction<IDictionary | null>>
	countWords: number,
	setCountWords: Dispatch<SetStateAction<number>>
	init: () => void
}

export const useSettingsWords = (): IUseSettingsWords => {
	const { getDictionaryList } = useDictionaryList()
	const [dictionaryList, setDictionaryList] = useState<IDictionary[]>([])
	const [dictionary, setDictionary] = useState<IDictionary | null>(null)
	const [countWords, setCountWords] = useState(50)

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
		setCountWords,
		setDictionary,
		init,
	}
}
