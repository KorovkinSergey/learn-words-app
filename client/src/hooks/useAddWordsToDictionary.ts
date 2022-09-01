import { useHttp } from "./useHttp";
import { useCallback } from "react";
import { IWord } from "../types/word";

export const useAddWordsToDictionary = () => {
	const { loading, error, request } = useHttp();

	const addWordsHandler = useCallback(async (dictionary: string, words?: IWord[]) => {
		try {
			return request(`/api/dictionary/${dictionary}`, "POST", { words });

		} catch (e) {
			console.log("e", e);
		}
	}, [request]);

	return { addWordsHandler, loading, error };
};
