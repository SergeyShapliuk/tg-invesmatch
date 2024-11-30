import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {UserData} from "../../types/types";


export const useFetchUserShare = (tg_id: string): QueryObserverResult<UserData, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserDataShare(tg_id);
            return data;
        },
        queryKey: ["get-user-share"],
        retry: 2,
        enabled: false
    });
};
