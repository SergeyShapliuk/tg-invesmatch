import {axiosInstanceApi} from "./instanceApi";
import {AxiosResponse} from "axios";
import {
    GetCurrencyData,
    GetFormData,
    Likes,
    Matches,
    RegisterVariables,
    UpdateVariables,
    UserData
} from "../types/types";


export const api = {
    async getHealth() {
        const response = await axiosInstanceApi.get<AxiosResponse<any>>("/healthz", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getForms() {
        const response = await axiosInstanceApi.get<AxiosResponse<GetFormData>>("statics/form", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getCurrency() {
        const response = await axiosInstanceApi.get<AxiosResponse<GetCurrencyData>>("statics/currencies", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async register(body: RegisterVariables) {
        const response = await axiosInstanceApi.post<AxiosResponse<UserData>>("users/registration", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserData(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<UserData>>(`users/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserDataShare(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<UserData>>(`users/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getRelevance(body: { tg_id: string, user_tg_id: string }) {
        const response = await axiosInstanceApi.post<any, AxiosResponse<{ success: boolean, message: string, data: number }>>("users/getUserRelevance", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async updateUser(body: UpdateVariables) {
        const response = await axiosInstanceApi.put<AxiosResponse<UserData>>("users/updateUser", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserRelevance(body: UpdateVariables) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("users/getListOfUsersWithRelevance", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getMatches(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<Matches>>(`interaction/getMatches/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getLikes(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<Likes>>(`interaction/getLikes/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async setLike(body: { tg_id: string, tg_id_what_i_liked: string }) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("interaction/setLike", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async setDislike(body: { tg_id: string, tg_id_what_i_liked: string }) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("interaction/setDislike", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    }
};
