import { api } from "../api/api";

export const useGetProducts = async () => {
    const response = await api({endpoint:'/products', method:'GET'}).then(res => res);
    console.log("🚀 ~ getProducts ~ response:", response)   
    return response;
};