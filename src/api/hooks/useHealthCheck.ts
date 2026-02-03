import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {GetCurrencyData} from "../../types/types";


export const useHealthCheck = (): QueryObserverResult<void, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getHealth();
            return data;
        },
        queryKey: ["get-health"],
        retry: 2
    });
};
