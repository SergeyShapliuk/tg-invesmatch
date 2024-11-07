import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {GetCurrencyData} from "../../types/types";


export const useFetchCurrency = (): QueryObserverResult<GetCurrencyData, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getCurrency();
            return data;
        },
        queryKey: ["get-currency"],
        retry: 2
    });
};
