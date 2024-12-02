import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api";


export const useRelevance = (): UseMutationResult<{ success: boolean, message: string, data: number }, any, { tg_id: string, user_tg_id: string }, unknown> => {
    return useMutation({
        mutationFn: async (variables: { tg_id: string, user_tg_id: string }) => {
            const {data} = await api.getRelevance(variables);
            return data;
        },
        mutationKey: ["get-relevance"],
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
