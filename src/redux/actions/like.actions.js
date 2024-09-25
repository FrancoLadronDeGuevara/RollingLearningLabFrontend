import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";


export const likeWorkshop = createAsyncThunk( "likeWorkshop", async (id) => {
    const response = await clientAxios.put(`/workshops/like-workshop/${id}`);
    return response.data;
})
 0
export const likeEvent = createAsyncThunk( "likeEvent", async (id) => {
    const response = await clientAxios.put(`/events/like-event/${id}`);
    return response.data;
})

export const likeComment = createAsyncThunk( "likeComment", async (id) => {
    const response = await clientAxios.put(`/comments/like-comment/${id}`);
    return response.data;
})