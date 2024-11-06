import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {GetFormData} from "../../types/types";


export const useFetchForms = (): QueryObserverResult<GetFormData, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getForms();
            return data;
        },
        queryKey: ["get-form"],
        retry: 2
    });
};
