import { AxiosInstance } from "../providers/axiosInstance";

export const addFranchiseRequest = (values) => {
	return AxiosInstance.post('/franchiseRequests/add', values, {
        headers: {
            Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGY5ZmUxZGQ5MzU1ZmI2ZWZlYWE1NyIsImlhdCI6MTY2OTgyMjA2OCwiZXhwIjoxNjY5ODIyNjY4fQ.dhtKKGH_0b36u6lz7n-vsF6PMjLDNzVi5jQQVRJDAkg"
        }
    });
}

export const getFranchiseRequestDetail = (id) => {
    return AxiosInstance.get(`/franchiseRequests/${id}`);
}

export const editFranchiseRequest = (values, id) => {
	return AxiosInstance.patch(`/franchiseRequests/edit/${id}`, values);
}

export const cancelFranchiseRequest = (id) => {
	return AxiosInstance.delete(`/franchiseRequests/cancel/${id}`);
}

