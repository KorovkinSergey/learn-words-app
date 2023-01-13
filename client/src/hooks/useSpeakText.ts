export interface IUseSpeakText {
	speak: (text: string) => void
}

export const useSpeakText = (): IUseSpeakText => {
	const speak = (text: string) => {
		const voices = window.speechSynthesis.getVoices()
		const utterance = new window.SpeechSynthesisUtterance()
		utterance.text = text
		utterance.voice = voices[145]

		utterance.rate = 1
		utterance.pitch = 1
		utterance.volume = 1
		window.speechSynthesis.speak(utterance)
	}

	return {
		speak,
	}
}
