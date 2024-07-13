import {createContext, useEffect, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const messageData = {photoURL: '', senderId: '', date: '', text: '', delivered: true}
    const [newMessage, setNewMessage] = useState(messageData)
    const [messageHistory, setMessageHistory] = useState([messageData])

    const [chatPartner, setChatPartner] = useState({photoURL : '', name: '', userId: '', lastMessage: '', isActive: false})
    const [partnerList, setPartnerList] = useState([
        {
            photoURL : 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
            name: 'Jacob',
            userId: 'user1',
            lastMessage: 'I am not sure if we can work that out.',
            isActive: false
        },
        {
            photoURL : 'https://t3.ftcdn.net/jpg/03/85/20/64/360_F_385206426_wllRGLFfXeFHB7x41Jc2Lz5kZjo2PraC.jpg',
            name: 'Nadine',
            userId: 'user2',
            lastMessage: 'That sounds greater than ever.',
            isActive: false
        },
        {
            photoURL : 'https://media.glamour.com/photos/5695c14716d0dc3747ede10d/master/w_1600,c_limit/entertainment-2013-07-patrick-j-adams-main.jpg',
            name: 'Bobert',
            userId: 'user3',
            lastMessage: 'Okay',
            isActive: false
        },
    ])

    useEffect(() => {
        // Request message list of conversation between this user and its partner from server
        // Set the state with these messages
        setMessageHistory(requestMessageHistory('xxx', 'xxx'))
    }, [chatPartner]);

    const requestMessageHistory = (ownId, partnerId) => {
        return [{
                photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
                senderId: 'user1',
                date: '11:02 AM, January, 23rd',
                text: 'I am not sure if that can work out.',
                delivered: true
            },
            {   photoURL: '',
                senderId: 'ownId',
                date: '12:02 AM, January, 23rd',
                text: 'That is not a problem.',
                delivered: true
            },
            {
                photoURL: 'https://static01.nyt.com/images/2022/06/16/arts/16OLD-MAN1/16OLD-MAN1-mediumSquareAt3X-v3.jpg',
                senderId: 'user1',
                date: '11:02 AM, January, 23rd',
                text: 'See you next time!',
                delivered: true
            }]
    }

    const processOutgoingMessage = (text) => {
        if (text.trim() === '') {
            // text is empty
            return
        }

        const messageData = {
            photoURL: '',
            senderId: 'ownId',
            date: '1 January 1st 14:05:36',
            text: text,
            delivered: true
        }

        // Render the message in the chat window
        appendMessageToChat(messageData)

        // Send the message to the server
        if (sendMessage(messageData) === false) {
            // show user that message was not delivered
        }

    }

    const sendMessage = (messageData) => {
        console.log('sent message: ' + messageData.text)
        console.log('waiting for server response...')

        const serverResponse = ''

        if (serverResponse === 'msg received')
            return true

        if (serverResponse === 'msg denied')
            return false

        if (serverResponse === 'msg timeout')
            return false
    }

    const setMessageFailed = (senderId) => {
        const copiedMessageHistory = [...messageHistory]
        const messageData = copiedMessageHistory.find( message => message.userId === senderId)
        messageData.delivered = false
        setMessageHistory(copiedMessageHistory)
    }

    const processIncomingMessage = (messageData) => {
        const partnerListCopy = [...partnerList]
        const partnerData = getPartnerData(messageData.senderId)
        const isSenderNew = partnerData == null
        const isSenderChatPartner = chatPartner.userId === messageData.senderId
        const isAppMinimized = true;

        if (isSenderNew) {
            // the sender is not a partner yet
            createNewPartner(messageData, partnerListCopy)

        } else {
            // the sender is already a partner
            setPartnerLastMessage(messageData, partnerData, partnerListCopy)

            if (isSenderChatPartner) {
                // client currently has an open chat window with the sender
                appendMessageToChat(messageData)
            }
        }

        if (isAppMinimized) {
            // app is minimized to system tray
            playNotificationSound()
            showDesktopNotification()
        }
    }

    const getPartnerData = (Id, partnerListCopy) => {
        return partnerListCopy.find(partner => partner.userId === Id)
    }

    const createNewPartner = (messageData, partnerListCopy) => {
        const newPartner = {
            photoURL : messageData.photoURL,
            name: messageData.name,
            userId: messageData.senderId,
            lastMessage: messageData.text,
            isActive: false
        }

        partnerListCopy.push(newPartner)
        setPartnerList(partnerListCopy)
    }

    const setPartnerLastMessage = (messageData, partnerData, partnerListCopy) => {
        partnerData.lastMessage = messageData.text
        setPartnerList(partnerListCopy)
    }

    const appendMessageToChat = (messageData) => {
        const messageListCopy = [...messageHistory]
        messageListCopy.push(messageData)
        setMessageHistory(messageListCopy)
    }

    const playNotificationSound = () => {

    }

    const showDesktopNotification = () => {

    }

    return (
        <MessageContext.Provider value={{
            processOutgoingMessage,
            newMessage,
            setNewMessage,
            messageHistory,
            setMessageHistory,
            chatPartner,
            setChatPartner,
            partnerList,
            setPartnerList
        }}>
            {children}
        </MessageContext.Provider>
    );
};