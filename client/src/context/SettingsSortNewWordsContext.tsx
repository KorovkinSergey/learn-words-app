import React, { createContext, FC, useContext } from 'react'
import { IUseSettingsNewWords, useSettingsNewWords } from '../hooks/useSettingsNewWords'

export type TUseSettingsNewWordsContextProps = IUseSettingsNewWords

const SettingsSortNewWordsContext = createContext<TUseSettingsNewWordsContextProps>(
	{} as TUseSettingsNewWordsContextProps
)

export function useSettingsSortNewWordsContext(): TUseSettingsNewWordsContextProps {
	const context = useContext(SettingsSortNewWordsContext)

	if (context === undefined) {
		throw new Error('useSettingsNewWordsContext must be used within the SettingsNewWordsContextProvider')
	}

	return context
}

interface SettingsNewWordsContextProviderProps {
	children: React.ReactNode
}

export const SettingsSortNewWordsContextProvider: FC<SettingsNewWordsContextProviderProps> = ({ children }) => {
	const contextValue = useSettingsNewWords()
	return <SettingsSortNewWordsContext.Provider value={contextValue}>{children}</SettingsSortNewWordsContext.Provider>
}
