import { api } from "@/libs/api";
import { useMutation, useQuery } from "@tanstack/solid-query";

export const useHelloQuery = (name: string) =>
	useQuery(() => ({
		queryKey: ["hello", name],
		queryFn: async () => {
			const res = await api.api.hello.get({ query: { name } });
			if (res.error) throw new Error(res.error.value?.message ?? "API error");
			if (!res.data) throw new Error("No data");
			return res.data;
		},
	}));

export const useEchoMutation = () =>
	useMutation(() => ({
		mutationFn: async (text: string) => {
			const res = await api.api.echo.post({ text });
			if (res.error) throw new Error(res.error.value?.message ?? "API error");
			if (!res.data) throw new Error("No data");
			return res.data;
		},
	}));
