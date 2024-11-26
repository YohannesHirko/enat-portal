import axiosInstance from "./../api/axios";
import { HTTPError } from "./errorHandler";

export const genericAxiosMutation = async (variables) => {
    const payload = JSON.stringify(variables.payload);
    const response = await axiosInstance.post(variables.endpoint, payload, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${variables?.token}`,
        },
    });
    return response.data;
};
export const genericFetcher = async (variables) => {
    const response = await fetch(
        `${variables.baseURL}/enat/v1/${variables.endpoint}${
            variables.queryString ? `?${variables.queryString}` : ""
        }`,
        {
            headers: {
                Authorization: `Bearer ${variables.token}`,
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new HTTPError(data.message, response.status);
    }
    return data;
};
export const genericMutation = async (variables) => {
    const response = await fetch(
        `${variables.baseURL}/enat/v1/${variables.endpoint}`,
        {
            method: `${variables.method}`,
            headers: {
                Authorization: `Bearer ${variables.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(variables.payload),
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new HTTPError(data.message, response.status, data);
    }
    return data;
};
