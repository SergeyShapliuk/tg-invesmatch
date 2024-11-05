import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api";
import {UpdateVariables} from "../../types/types";


export const useUpdateUser = (): UseMutationResult<any, any, UpdateVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: UpdateVariables) => {
            const {data} = await api.updateUser(variables);
            return data;
        },
        mutationKey: ["update-user"],
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
