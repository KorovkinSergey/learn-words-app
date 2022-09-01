import { useCallback, useEffect, useReducer } from "react";
import { useDictionary } from "./useDictionary";
import { useRemoveWordsToDictionary } from "./useRemoveWordsToDictionary";
import { useAddWordsToDictionary } from "./useAddWordsToDictionary";
import { useSettingsNewWordsContext } from "../context/SettingsNewWordsContext";
import { IWord } from "../types/word";

const actionTypes = {
	FIRST_WORD: "FIRST_WORD",
	LAST_WORD: "LAST_WORD",
	NEXT_WORD: "NEXT_WORD",
	ADD_TO_REPEAT: "ADD_TO_REPEAT",
	ADD_TO_KNOW: "ADD_TO_KNOW",
	ADD_WORDS: "ADD_WORDS",
	CLEAR: "CLEAR",
	IS_LOADING: "IS_LOADING",
};

const DEFAULT_STATE = {
	index: 0,
	word: null,
	repeat: [],
	knowWords: [],
	words: [],
	isLoading: false,
};

interface IAction {
	type: string;
	words?: IWord[];
}

export interface IState {
	isLoading: boolean,
	repeat: IWord[] | [],
	knowWords: IWord[] | [],
	words: IWord[] | [],
	word: IWord,
	index: number,
}

const reducer = (state: any, action: IAction) => {
	switch (action.type) {
		case actionTypes.FIRST_WORD:
			return { ...state, word: state.words[state.index], index: state.index + 1 };
		case actionTypes.LAST_WORD:
			return { ...state, repeat: [...state.repeat, state.word], word: null };
		case actionTypes.NEXT_WORD:
			return {
				...state,
				word: state.words[state.index] ? state.words[state.index] : null,
				index: state.index + 1,
				repeat: [...state.repeat, state.word],
			};
		case actionTypes.ADD_TO_REPEAT:
			if (state.words.length === state.index) {
				return { ...state, repeat: [...state.repeat, state.word], word: null };
			}
			return {
				...state,
				word: state.words[state.index] ? state.words[state.index] : null,
				index: state.index + 1,
				repeat: [...state.repeat, state.word],
			};
		case actionTypes.ADD_TO_KNOW:
			if (state.words.length === state.index) {
				return { ...state, knowWords: [...state.knowWords, state.word], word: null };
			}
			return {
				...state,
				word: state.words[state.index] ? state.words[state.index] : null,
				index: state.index + 1,
				knowWords: [...state.knowWords, state.word],
			};
		case actionTypes.ADD_WORDS:
			return { ...state, words: action.words };
		case actionTypes.CLEAR:
			return { ...DEFAULT_STATE, words: state.words };
		case actionTypes.IS_LOADING:
			return { ...DEFAULT_STATE, isLoading: !state.isLoading };
		default:
			return state;
	}
};

let interval: string | number | NodeJS.Timer | undefined;
let timeOut: string | number | NodeJS.Timer | undefined;

export interface IUseTrainingNewWords {
	loading: boolean,
	repeat: IWord[],
	knowWords: IWord[],
	handleIsKnow: () => void,
	handleIsNotKnow: () => void,
	word: IWord | null,
	clear: () => void,
	save: () => Promise<void>,
	index: number,
	saveLoading: boolean,
}

export const useTrainingNewWords = (): IUseTrainingNewWords => {

	const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
	const { knowWords, repeat, word, words, index, isLoading } = state;

	const { timeToRemember, countWords } = useSettingsNewWordsContext();

	const { requestHandler, loading } = useDictionary();
	const { deleteHandler } = useRemoveWordsToDictionary();
	const { addWordsHandler } = useAddWordsToDictionary();

	useEffect(() => {
		requestHandler("new", { _limit: countWords.toString() }).then((words) => {
			dispatch({ type: actionTypes.ADD_WORDS, words });
		});
	}, [timeToRemember, countWords, requestHandler]);

	useEffect(() => {
		if (!words.length) return;
		if (word === null && index === words.length) {
			clearInterval(interval);
			clearTimeout(timeOut);
			return;
		}

		if (words.length === index) {
			timeOut = setTimeout(() => {
				dispatch({ type: actionTypes.LAST_WORD });
				clearInterval(interval);
			}, timeToRemember * 1000);
			return () => clearInterval(interval);
		}

		if (word === null && index === 0) dispatch({ type: actionTypes.FIRST_WORD });

		interval = setInterval(() => dispatch({ type: actionTypes.NEXT_WORD }), timeToRemember * 1000);

		return () => clearInterval(interval);

	}, [words, word, index, timeToRemember]);

	const save = useCallback(async () => {
		dispatch({ type: actionTypes.IS_LOADING });
		await addWordsHandler("repeat", repeat);
		await addWordsHandler("learned", knowWords);
		await deleteHandler("new", [...knowWords, ...repeat]).then((r) => console.log("remove word", r));
		dispatch({ type: actionTypes.IS_LOADING });
	}, [repeat, knowWords, addWordsHandler, deleteHandler]);

	const handleIsKnow = () => {
		clearInterval(interval);
		clearTimeout(timeOut);
		dispatch({ type: actionTypes.ADD_TO_KNOW });
	};
	const handleIsNotKnow = () => {
		clearInterval(interval);
		clearTimeout(timeOut);
		dispatch({ type: actionTypes.ADD_TO_REPEAT });
	};

	const clear = useCallback(() => dispatch({ type: actionTypes.CLEAR }), []);

	return {
		clear,
		repeat,
		knowWords,
		loading,
		saveLoading: isLoading,
		handleIsKnow,
		handleIsNotKnow,
		save,
		word,
		index,
	};
};

