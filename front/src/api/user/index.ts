import { api } from "..";
import { IUser, Login, SignUp } from "../../interfaces/User";

export const signUpRequest = async (body: SignUp) => {
    const { data } = await api.post('/users', body);
    return data;
}

export const loginRequest = async (body: Login) => {
    const { data } = await api.post('/users/login', body);
    return data;
}

export const getUserProfileRequest = async () => {
    const { data } = await api.get('/users');
    return data;
}

export const updateUserProfileRequest = async (body: IUser) => {
    const { data } = await api.put('/users', body);
    return data;
}

export const updateUserProfilePictureRequest = async (picture: string | ArrayBuffer) => {
    const { data } = await api.patch('/users/picture', { picture }, { headers: { 'content-type': 'multipart/form-data' } });
    return data;
}