import React, { createContext, FC, useContext } from 'react'
import { IUseSettingsLearnWords, useSettingsLearnWords } from '../hooks/useSettingsLearnWords'

export type TUseSettingsLearnWordsContextProps = IUseSettingsLearnWords

const SettingsLearnWordsContext = createContext<TUseSettingsLearnWordsContextProps>(
	{} as TUseSettingsLearnWordsContextProps
)

export function useSettingsLearnWordsContext(): TUseSettingsLearnWordsContextProps {
	const context = useContext(SettingsLearnWordsContext)

	if (context === undefined) {
		throw new Error('useSettingsLearnWordsContext must be used within the SettingsLearnWordsContextProvider')
	}

	return context
}

interface SettingsLearnWordsContextProviderProps {
	children: React.ReactNode
}

export const SettingsLearnWordsContextProvider: FC<SettingsLearnWordsContextProviderProps> = ({ children }) => {
	const contextValue = useSettingsLearnWords()
	return <SettingsLearnWordsContext.Provider value={contextValue}>{children}</SettingsLearnWordsContext.Provider>
}
