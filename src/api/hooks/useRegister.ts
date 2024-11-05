import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {api} from "../api";
import {RegisterVariables} from "../../types/types";


export const useRegister = (): UseMutationResult<any, any, RegisterVariables, unknown> => {
    return useMutation({
        mutationFn: async (variables: RegisterVariables) => {
            const {data} = await api.register(variables);
            return data;
        },
        mutationKey: ["register"],
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
