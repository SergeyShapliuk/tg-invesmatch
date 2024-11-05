import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api";
import {UpdateVariables} from "../../types/types";


export const useFetchUserRelevance = (): UseMutationResult<any, any, UpdateVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables) => {
            const {data} = await api.getUserRelevance(variables);
            return data;
        },
        mutationKey: ["get-user-relevance"],
        // enabled: false,
        retry: 2
        // onError: (error) => {
        //     console.error("Ошибка при запуске таймера:", error);
        // },
        // onSuccess: (data) => {
        //     console.log("Таймер успешно запущен:", data);
        // }
    });
};
