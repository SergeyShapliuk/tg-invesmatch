import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {GetForm} from "../../types/types";


export const useFetchForms = (): QueryObserverResult<GetForm[], any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getForms();
            return data;
        },
        queryKey: ["get-form"],
        retry: 2
    });
};
