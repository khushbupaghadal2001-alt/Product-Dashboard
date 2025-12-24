import { api } from "../api/api";


export const useGetProducts = async (search = "") => {
  const query = search ? `name=${search}` : "";
  const response = await api({ endpoint: `/products?${query}`, method: "GET" }).then(
    (res) => res
  );
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
