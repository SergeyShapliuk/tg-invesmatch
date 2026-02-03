import {useQuery} from "@tanstack/react-query";
import {api} from "../api";


export const useHealthCheck = () => {
    return useQuery({
        queryFn: async () => {
            const {data} = await api.getHealth();
            return data;
        },
        queryKey: ["get-health"],
        retry: 2
    });
};
