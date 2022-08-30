import React, { createContext, FC, useContext } from 'react'
import { IUseSettingsNewWords, useSettingsNewWords } from '../hooks/useSettingsNewWords'

export type TUseSettingsNewWordsContextProps = IUseSettingsNewWords;

const SettingsNewWordsContext = createContext<TUseSettingsNewWordsContextProps>({} as TUseSettingsNewWordsContextProps)

export function useSettingsNewWordsContext(): TUseSettingsNewWordsContextProps {
  const context = useContext(SettingsNewWordsContext)

  if (context === undefined) {
    throw new Error('useSettingsNewWordsContext must be used within the SettingsNewWordsContextProvider')
  }

  return context
}

interface SettingsNewWordsContextProviderProps {
  children: React.ReactNode;
}

export const SettingsNewWordsContextProvider: FC<SettingsNewWordsContextProviderProps> = ({ children }) => {
  const contextValue = useSettingsNewWords()
  return <SettingsNewWordsContext.Provider value={contextValue}>{children}</SettingsNewWordsContext.Provider>
}
