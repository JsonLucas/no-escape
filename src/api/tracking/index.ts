import { api } from "..";
import { Track } from "../../interfaces/Track";

export const getTrackingByIdRequest = async (id: number) => {
    const { data } = await api.get(`/tracking/${id}`);
    return data;
}

export const getAllTrackingsRequest = async () => {
    const { data } = await api.get('/tracking');
    return data;
}

export const createTrackingRequest = async (body: Track) => {
    const { data } = await api.post('/tracking', body);
    return data;
}

export const updateTrackingRequest = async (body: Track, id: number) => {
    const { data } = await api.put(`/tracking/${id}`, body);
    return data;
}

export const deleteTrackingRequest = async (id: number) => {
    const { data } = await api.delete(`/tracking/${id}`);
    return data;
}