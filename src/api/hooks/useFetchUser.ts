import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {api} from "../api";
import {UserData} from "../../types/types";


export const useFetchUser = (tg_id: string): QueryObserverResult<UserData, any> => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getUserData(tg_id);
            return data;
        },
        queryKey: ["get-user"],
        retry: 2
    });
};
