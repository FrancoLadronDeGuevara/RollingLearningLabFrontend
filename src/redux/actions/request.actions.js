import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";

export const getAllRequests = createAsyncThunk("getAllRequests", async () => {
    const response = await clientAxios.get(`/requests`);
    return response.data;
})

export const createRoleRequest = createAsyncThunk("createRoleRequest", async (data) => {
    const response = await clientAxios.post(`/requests/request-role`, data);
    return response.data;
})

export const resendRequest = createAsyncThunk("resendRequest", async (data) => {
    const response = await clientAxios.put(`/requests/resend-request/${data._id}`, data);
    return response.data;
})

export const createWorkshopRequest = createAsyncThunk("createWorkshopRequest", async (data) => {
    const response = await clientAxios.post(`/requests/request-workshop`, data);
    return response.data;
})

export const getWorkshopRequest = createAsyncThunk("getWorkshopRequest", async () => {
    const response = await clientAxios.get(`/requests/get-workshop-request`);
    return response.data;
})

export const editRequest = createAsyncThunk("editRequest", async (data) => {
    const response = await clientAxios.put(`/requests/edit-request/${data._id}`, data);
    return response.data;
})

export const cancelRequest = createAsyncThunk("cancelRequest", async (data) => {
    const response = await clientAxios.delete(`/requests/cancel-request/${data._id}`, data);
    return response.data;
})

export const getRoleRequest = createAsyncThunk("getRoleRequest", async (id) => {
    const response = await clientAxios.get(`/requests/get-role-request/${id}`);
    return response.data;
})

export const deleteRequest = createAsyncThunk("deleteRequest", async (id) => {
    const response = await clientAxios.delete(`/requests/delete-request/${id}`);
    return response.data;
})

export const sendNote = createAsyncThunk("sendNote", async (data) => {
    const response = await clientAxios.put(`/requests/send-note/${data._id}`, data);
    return response.data;
})