import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";

export const createWorkshop = createAsyncThunk("createWorkshop", async (data) => {
    const response = await clientAxios.post(`/workshops/create-workshop`, data);
    return response.data;
});

export const getWorkshop = createAsyncThunk("getWorkshop", async (id) => {
    const response = await clientAxios.get(`/workshops/get-workshop/${id}`);
    return response.data;
})

export const getAllWorkshops = createAsyncThunk("getAllWorkshops", async () => {
    const response = await clientAxios.get(`/workshops`);
    return response.data;
})

export const updateWorkshop = createAsyncThunk("updateWorkshop", async (data) => {
    const response = await clientAxios.put(`/workshops/update-workshop/${data._id}`, data);
    return response.data;
})

export const deleteWorkshop = createAsyncThunk("deleteWorkshop", async (id) => {
    const response = await clientAxios.delete(`/workshops/delete-workshop/${id}`);
    return response.data;
})

// export const addWorkshopToFavorites = createAsyncThunk("addWorkshopToFavorites", async (data) => {
//     const response = await clientAxios.post(`/workshops/add-to-favorites`, data);
//     return response.data;
// })

// export const removeWorkshopFromFavorites = createAsyncThunk("removeWorkshopFromFavorites", async (data) => {
//     const response = await clientAxios.post(`/workshops/remove-from-favorites`, data);
//     return response.data;
// })