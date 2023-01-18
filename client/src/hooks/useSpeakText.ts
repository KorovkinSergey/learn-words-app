import { useCallback, useEffect, useState } from 'react'
import { useSettingsWordsContext } from '../context/SettingsWordsContext'

export interface IUseSpeakText {
	speak: (text: string) => void
	supported: boolean
	speaking: boolean
	cancel: () => void
}

export const useSpeakText = (): IUseSpeakText => {
	const { language } = useSettingsWordsContext()
	const [voices, setVoices] = useState([])
	const [speaking, setSpeaking] = useState(false)
	const [supported, setSupported] = useState(false)

	const processVoices = (voiceOptions: any) => {
		setVoices(voiceOptions)
	}

	const getVoices = () => {
		// Firefox seems to have voices upfront and never calls the
		// voiceschanged event
		let voiceOptions = window.speechSynthesis.getVoices()
		if (voiceOptions.length > 0) {
			processVoices(voiceOptions)
			return
		}

		window.speechSynthesis.onvoiceschanged = (event: any) => {
			voiceOptions = event.target.getVoices()
			processVoices(voiceOptions)
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && window.speechSynthesis) {
			setSupported(true)
			getVoices()
		}
	}, [])

	const speak = useCallback(
		(text: string) => {
			if (!supported) return
			setSpeaking(true)
			// Firefox won't repeat an utterance that has been
			// spoken, so we need to create a new instance each time
			const utterance = new window.SpeechSynthesisUtterance()
			utterance.text = text
			utterance.voice = language === 'English' ? voices[145] : voices[0]
			utterance.rate = 1
			utterance.pitch = 1
			utterance.volume = 1
			window.speechSynthesis.speak(utterance)
		},
		[supported, voices, language],
	)

	const cancel = useCallback(() => {
		if (!supported) return
		setSpeaking(false)
		window.speechSynthesis.cancel()
	}, [supported])

	return {
		supported,
		speak,
		speaking,
		cancel,
	}
}
