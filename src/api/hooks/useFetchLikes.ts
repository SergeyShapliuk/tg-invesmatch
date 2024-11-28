import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {Likes} from "../../types/types";


export const useFetchLikes = (tg_id: string, refetchOnMount: boolean | "always" = false): QueryObserverResult<Likes, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getLikes(tg_id);
            return data;
        },
        queryKey: ["get-likes"],
        retry: 2,
        refetchOnMount: refetchOnMount,
    });
};
