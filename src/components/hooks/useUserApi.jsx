import React, {useContext} from 'react';
import {api} from "./Api.js";
import {LoginContext} from "../../Contexts/LoginContext.jsx";

export const useUserApi = () => {
    const { userId: loggedInUserId, token: token } = useContext(LoginContext);
    const { callApi } = api()
    const apiUrl = import.meta.env.VITE_API_URL

    const fetchUser = async () => {
        return await callApi(`${apiUrl}/api/User/GetUser/${loggedInUserId}`);
    }

    const changeDisplayname = async (username ) => {
        return await callApi(`${apiUrl}/api/User/ChangeUsername/${loggedInUserId}/${username}/${token}`, { method: 'PUT' });
    }

    const uploadProfilePictureToImgbb = async ( formData ) => {
        return await callApi('https://api.imgbb.com/1/upload?key=690b9ff36daaded345c3634167d233a3', {
            method: 'POST',
            data: formData
        });
    }

    const changeProfilePicture = async ( imageURL ) => {
        return await callApi(`${apiUrl}/api/User/ChangeProfilePicture`, { method: 'PUT', data: {
                Token: token,
                UserId: loggedInUserId,
                ImageURL: imageURL
            }})
    }

    const loginUser = async (userId, password) => {
        return await callApi(`${apiUrl}/api/User/LoginUser/${userId}/${password}`, { method: 'POST' })
    }

    const createUser = async (displayname, username, password) => {
        return await callApi(`${apiUrl}/api/User/CreateUser/${username}/${displayname}/${password}`, { method: 'POST' })
    }

    const deleteUser = async () => {
        return await callApi(`${apiUrl}/api/User/DeleteUser/${loggedInUserId}/${token}`, { method: 'DELETE' });
    }

    return {
        fetchUser,
        loginUser,
        createUser,
        deleteUser,
        changeDisplayname: changeDisplayname,
        changeProfilePicture,
        uploadProfilePictureToImgbb
    }
}