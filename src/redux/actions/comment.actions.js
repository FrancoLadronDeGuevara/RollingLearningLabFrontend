import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/client.axios";

export const createWorkshopComment = createAsyncThunk("createWorkshopComment", async (data) => {
    const response = await clientAxios.post(`/comments/add-workshop-comment/${data._id}`, data);
    return response.data;
})

export const getWorkshopComments = createAsyncThunk("getWorkshopComments", async (id) => {
    const response = await clientAxios.get(`/comments/get-workshop-comments/${id}`);
    return response.data;
})

export const createEventComment = createAsyncThunk("createEventComment", async (data) => {
    const response = await clientAxios.post(`/comments/add-event-comment/${data._id}`, data);
    return response.data;
})

export const getEventComments = createAsyncThunk("getEventComments", async (id) => {
    const response = await clientAxios.get(`/comments/get-event-comments/${id}`);
    return response.data;
})

export const getUserComments = createAsyncThunk("getUserComments", async (id) => {
    const response = await clientAxios.get(`/comments/get-user-comments/${id}`);
    return response.data;
})

export const editComment = createAsyncThunk("editComment", async (data) => {
    const response = await clientAxios.put(`/comments/edit-comment/${data._id}`, data);
    return response.data;
})

export const deleteComment = createAsyncThunk("deleteComment", async (id) => {
    const response = await clientAxios.delete(`/comments/delete-comment/${id}`);
    return response.data;
})

export const replyComment = createAsyncThunk("replyComment", async (data) => {
    const response = await clientAxios.post(`/comments/reply-comment/${data._id}`, data);
    return response.data;
})

export const deleteReply = createAsyncThunk("deleteReply", async (data) => {
    const response = await clientAxios.put(`/comments/delete-reply/${data._id}`, data);
    return response.data;
})

export const likeComment = createAsyncThunk("likeComment", async (data) => {
    const response = await clientAxios.put(`/comments/like-comment/${data._id}`, data);
    return response.data;
})

export const blockComment = createAsyncThunk("blockComment", async (data) => {
    const response = await clientAxios.put(`/comments/block-comment/${data._id}`, data);
    return response.data;
})