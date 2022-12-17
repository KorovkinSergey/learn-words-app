import React, { useState } from 'react'

export interface IUseSettingsNewWords {
	timeToRemember: number
	countWords: number
	setCountWords: React.Dispatch<React.SetStateAction<number>>
	setTimeToRemember: React.Dispatch<React.SetStateAction<number>>
}

export const useSettingsNewWords = (): IUseSettingsNewWords => {
	const [countWords, setCountWords] = useState(5)
	const [timeToRemember, setTimeToRemember] = useState(2)

	return { timeToRemember, countWords, setCountWords, setTimeToRemember }
}
