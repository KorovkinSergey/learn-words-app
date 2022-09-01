import { useHttp } from "./useHttp";
import { useCallback } from "react";
import { FieldValues } from "react-hook-form";

export const useRegister = () => {
	const { loading, error, request } = useHttp();

	const registerHandler = useCallback(async (form: FieldValues) => {
		try {
			await request("/api/auth/register", "POST", { form });

		} catch (e: unknown) {
			throw e as Error;
		}
	}, [request]);

	return { registerHandler, loading, error };
};
