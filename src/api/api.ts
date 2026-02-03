import {axiosInstanceApi} from "./instanceApi";
import {AxiosResponse} from "axios";
import {
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
    async getForms(): Promise<any> {
        const response = await axiosInstanceApi.get<any>("statics/form", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getCurrency(): Promise<any> {
        const response = await axiosInstanceApi.get<any>("statics/currencies", {
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
    async getUserData(telegram_id: string): Promise<any> {
        const response = await axiosInstanceApi.get<any>(`users/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getUserDataShare(telegram_id: string): Promise<any> {
        const response = await axiosInstanceApi.get<any>(`users/${telegram_id}`, {
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
    async getMatches(telegram_id: string): Promise<any> {
        const response = await axiosInstanceApi.get<any>(`interaction/getMatches/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async getLikes(telegram_id: string): Promise<any> {
        const response = await axiosInstanceApi.get<any>(`interaction/getLikes/${telegram_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async setLike(body: { tg_id: string, tg_id_what_i_liked: string }): Promise<any> {
        const response = await axiosInstanceApi.post<any>("interaction/setLike", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    },
    async setDislike(body: { tg_id: string, tg_id_what_i_liked: string }): Promise<any> {
        const response = await axiosInstanceApi.post<any>("interaction/setDislike", body, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    }
};
