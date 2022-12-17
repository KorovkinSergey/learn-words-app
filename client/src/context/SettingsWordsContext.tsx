import React, { createContext, FC, useContext } from 'react'
import { IUseSettingsWords, useSettingsWords } from '../hooks/useSettingsWords'

export type TUseSettingsWordsContextProps = IUseSettingsWords

const SettingsWordsContext = createContext<TUseSettingsWordsContextProps>({} as TUseSettingsWordsContextProps)

export function useSettingsWordsContext(): TUseSettingsWordsContextProps {
	const context = useContext(SettingsWordsContext)

	if (context === undefined) {
		throw new Error('useSettingsNewWordsContext must be used within the SettingsNewWordsContextProvider')
	}

	return context
}

interface SettingsNewWordsContextProviderProps {
	children: React.ReactNode
}

export const SettingsWordsContextProvider: FC<SettingsNewWordsContextProviderProps> = ({ children }) => {
	const contextValue = useSettingsWords()
	return <SettingsWordsContext.Provider value={contextValue}>{children}</SettingsWordsContext.Provider>
}
