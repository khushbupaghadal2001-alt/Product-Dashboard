const baseURL = "http://localhost:3001";

type apiData = {
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: any,
    headers?: any
}

export const api = async (
  {endpoint,
  method = "GET",
  body = null,
  headers = {}} : apiData
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      // @ts-ignore
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseURL}${endpoint}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API Error");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
