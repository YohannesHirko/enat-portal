import { HTTPError } from "./errorHandler";

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
