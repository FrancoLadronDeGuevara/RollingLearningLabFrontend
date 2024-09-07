import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";

export const createEvent = createAsyncThunk("createEvent", async (data) => {
    const response = await clientAxios.post(`/events/create-event`, data);
    return response.data;
})

export const getEvent = createAsyncThunk("getEvent", async (id) => {
    const response = await clientAxios.get(`/events/get-event/${id}`);
    return response.data;
})

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
    const response = await clientAxios.get(`/events`);
    return response.data;
})

export const updateEvent = createAsyncThunk("updateEvent", async (data) => {
    const response = await clientAxios.put(`/events/update-event/${data._id}`, data);
    return response.data;
})

export const deleteEvent = createAsyncThunk("deleteEvent", async (id) => {
    const response = await clientAxios.delete(`/events/delete-event/${id}`);
    return response.data;
})