import { useCallback, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

interface IUseHttp {
	loading: boolean,
	request: (url: string, method?: string, body?: any | null, headers?: Record<string, string>) => any
	error: string | null,
	clearError: () => void
}

export const useHttp = (): IUseHttp => {
	const { token } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url: string,
																		 method = "GET",
																		 body: string | null = null,
																		 headers: Record<string, string> = {}) => {
		setLoading(true);
		try {
			if (body) {
				body = JSON.stringify(body);
				headers["Content-type"] = "application/json";
			}
			if (token) {
				headers["Authorization"] = `Bearer ${token}`;
			}
			const response = await fetch(url, { method, body, headers });
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Что-то пошло не так");
			}
			setLoading(false);
			return data;
		} catch (e: any) {
			setLoading(false);
			setError(e.message);
			throw e;
		}
	}, [token]);
	const clearError = () => setError(null);

	return { loading, request, error, clearError };
};
