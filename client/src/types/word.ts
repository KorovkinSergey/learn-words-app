export interface IWord {
	_id?: string
	russian: string
	english: string
	transcript: string
}

export interface IWordWithCheck extends IWord {
	check: boolean
}
