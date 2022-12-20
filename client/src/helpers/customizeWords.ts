import { IWord, IWordWithCheck } from '../types/word'

export const addCheckFieldInWords = (arr: IWord[]): IWordWithCheck[] => arr.map((word) => ({ ...word, check: false }))
export const removeCheckFieldInWords = (arr: IWordWithCheck[]): IWord[] => {
	return arr.map(({ _id, english, russian, transcript }) => ({ _id, english, russian, transcript }))
}
