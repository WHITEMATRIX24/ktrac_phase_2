
import axios, { AxiosResponse } from "axios";

export interface ApiConfigProps {
    fullUrl: string;
    method: string;
    data?: any;
    headers?: Record<string, string>;
    responseType?: "blob" | "json" | "text";
}

const apiConfig = async ({
    fullUrl,
    method,
    data,
    headers,
    responseType = "json",
}: ApiConfigProps): Promise<AxiosResponse> => {
    try {
        const response = await axios({
            url: fullUrl,
            method,
            data,
            headers,
            responseType,
        });
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message;
            throw new Error(message);
        }
        throw new Error("Unknown API error");
    }
};

export default apiConfig;
