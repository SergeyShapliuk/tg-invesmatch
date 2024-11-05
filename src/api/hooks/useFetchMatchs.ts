import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import { Matches} from "../../types/types";


export const useFetchMatches = (tg_id: string, refetchOnMount: boolean | "always" = false): QueryObserverResult<Matches, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getMatches(tg_id);
            return data;
        },
        queryKey: ["get-matches"],
        retry: 2,
        refetchOnMount: refetchOnMount
    });
};
