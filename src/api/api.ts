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
    async getForms() {
        const response = await axiosInstanceApi.get<AxiosResponse<GetFormData>>("getHashTagsAndInputs", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getCurrency() {
        const response = await axiosInstanceApi.get<AxiosResponse<GetCurrencyData>>("getCurrencies", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async register(body: RegisterVariables) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("registerUser", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async getUserData(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<UserData>>(`getUserData/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserDataShare(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<UserData>>(`getUserData/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async updateUser(body: UpdateVariables) {
        const response = await axiosInstanceApi.post<AxiosResponse<UserData>>("updateUser", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async getUserRelevance(body: UpdateVariables) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("getListOfUsersWithRelevance", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async getMatches(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<Matches>>(`getMatches/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getLikes(telegram_id: string) {
        const response = await axiosInstanceApi.get<AxiosResponse<Likes>>(`getLikes/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async setLike(body: { tg_id: string, tg_id_what_i_liked: string }) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("setLike", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    },
    async setDislike(body: { tg_id: string, tg_id_what_i_liked: string }) {
        const response = await axiosInstanceApi.post<AxiosResponse<any>>("setDislike", body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }
};
