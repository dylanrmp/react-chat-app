import React, {createContext, useContext, useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {LoginContext} from "./LoginContext.jsx";
import {ChatContext} from "./ChatContext.jsx";
import {MESSAGE_TYPES} from "./MESSAGE_TYPES.js";
import {webSocketOptions} from "../WebSocketOptions.js";

const apiURL = import.meta.env.VITE_API_URL_WEBSOCKET

export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendRequestResponse, setFriendRequestResponse] = useState(null);
    const [receivedFriendRequest, setReceivedFriendRequest] = useState(null);
    const [removedFriend, setRemovedFriend] = useState(null);
    const [friendStatus, setFriendStatus] = useState(null);
    const [changedProfilePicture, setChangedProfilePicture] = useState(null)
    const [changedUsername, setChangedUsername] = useState(null)

    const { userId: loggedInUserId, token: token } = useContext(LoginContext)
    const { removeChatTab } = useContext(ChatContext)
    const [socketUrl, setSocketUrl] = useState(null)
    const {lastJsonMessage} = useWebSocket(socketUrl, webSocketOptions)

    useEffect(() => {

        if (loggedInUserId != null && token != null){
            setSocketUrl(`${apiURL}/ws?userID=${loggedInUserId}&token=${token}`);
        }

    }, [loggedInUserId, token]);

    useEffect(() => {
        if (lastJsonMessage == null)
            return

        switch (lastJsonMessage.type) {
            case MESSAGE_TYPES.FRIEND_REQUEST_RECEIVED:
                setReceivedFriendRequest(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_REQUEST_RESPONSE:
                setFriendRequestResponse(lastJsonMessage)
                return
            case MESSAGE_TYPES.REMOVE_FRIEND:
                setRemovedFriend(lastJsonMessage)
                return
            case MESSAGE_TYPES.FRIEND_STATUS:
                setFriendStatus(lastJsonMessage)
                return
            case MESSAGE_TYPES.CHANGED_PROFILE_PICTURE:
                setChangedProfilePicture(lastJsonMessage)
                return
            case MESSAGE_TYPES.CHANGED_USERNAME:
                setChangedUsername(lastJsonMessage)
                return
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        if (removedFriend != null)
            removeChatTab(removedFriend.userId)
    }, [removedFriend]);

    return(
        <FriendContext.Provider value={{
            friendRequestRespondedNotification: friendRequestResponse,
            friendRequestReceivedNotification: receivedFriendRequest,
            friendRemovedNotification: removedFriend,
            friendStatusNotification: friendStatus,
            changedProfilePicture,
            changedUsername
        }}>
            {children}
        </FriendContext.Provider>
    )
}