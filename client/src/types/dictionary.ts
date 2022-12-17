export interface IDictionary {
	_id?: string
	title: string
	basic: boolean
}

export type IDictionariesList = Dictionary[]

type Dictionary = {
	title: string
	name: string
}
