import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";

export const addFavoriteWorkshop = createAsyncThunk("addFavoriteWorkshop", async (workshopId) => {
    const response = await clientAxios.post(`/users/add-favorite-workshop`, workshopId);
    return response.data;
});

export const removeFavoriteWorkshop = createAsyncThunk("removeFavoriteWorkshop", async (workshopId) => {
    const response = await clientAxios.post(`/users/remove-favorite-workshop`, workshopId);
    return response.data;
});

export const addEventFavorite = createAsyncThunk("addEventFavorite", async (eventId) => {
    const response = await clientAxios.post(`/users/add-favorite-event`, eventId);
    return response.data;
});

export const removeEventFavorite = createAsyncThunk("removeEventFavorite", async (eventId) => {
    const response = await clientAxios.post(`/users/remove-favorite-event`, eventId);
    return response.data;
});
