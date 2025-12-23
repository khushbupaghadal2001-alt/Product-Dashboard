import { api } from "../api/api";

export const useGetProducts = async () => {
  const response = await api({ endpoint: "/products", method: "GET" }).then(
    (res) => res
  );
  console.log("🚀 ~ getProducts ~ response:", response);
  return response;
};

export const useCreateProduct = async (data: any) => {
  return await api({
    endpoint: "/products",
    method: "POST",
    body: data,
  });
};

export const useUpdateProduct = async (id: number | string, data: any) => {
  return await api({
    endpoint: `/products/${id}`,
    method: "PUT",
    body: data,
  });
};

export const useDeleteProduct = async (id: number | string) => {
  return await api({
    endpoint: `/products/${id}`,
    method: "DELETE",
  });
};
