import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class HTTPTools {
    private static async request(method: 'GET' | 'POST', url: string, params?: any, body?: any): Promise<AxiosResponse<any>> {
        const config: AxiosRequestConfig = {
            method,
            url,
            params,
            data: body,
        };

        try {
            const response = await axios(config);
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
            throw new Error(`HTTP ${method} request to ${url} failed: ${error.message}`);
        }
    }

    public static async get(url: string, params?: any): Promise<AxiosResponse<any>> {
        return this.request('GET', url, params);
    }

    public static async post(url: string, body?: any, params?: any): Promise<AxiosResponse<any>> {
        return this.request('POST', url, params, body);
    }
}

export default HTTPTools;