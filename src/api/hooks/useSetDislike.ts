import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api";


export const useSetDislike = (): UseMutationResult<any, any, { tg_id: string, tg_id_what_i_liked: string }, unknown> => {
    return useMutation({
        mutationFn: async (variables) => {
            const {data} = await api.setDislike(variables);
            return data;
        },
        mutationKey: ["set-dislike"],
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
