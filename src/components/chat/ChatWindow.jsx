import '../../styles/App.css'
import {useCallback, useContext, useEffect, useLayoutEffect, useReducer, useRef, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';
import {ChatContext} from "../../Contexts/ChatContext.jsx";
import {ChatList} from "./ChatList.jsx";


function ChatWindow() {
    const chatWindowRef = useRef(null)
    const messageSequence = useRef({skip:  0, take: 15,})
    const newMessageCount = useRef(0)
    const prevScrollheight = useRef(null)
    const isNewMessage = useRef(false)
    const [forceRemount, setForceRemount] = useState(false)

    const {
        lastMessage,
        setMessageHistory,
        messageHistory,
        requestMessageHistory,
        openChatTab
    } = useContext(ChatContext)

    const handleScroll = () => {
        const chatWindow = chatWindowRef.current

        if (Math.ceil(Math.abs(chatWindow.scrollTop)) >= (chatWindow.scrollHeight - chatWindow.clientHeight) - 5){
            messageSequence.current = {skip: messageSequence.current.skip + 15 + newMessageCount.current, take: 15}
            requestMessageHistory(openChatTab.userId, messageSequence.current.skip, messageSequence.current.take)
            prevScrollheight.current = chatWindow.scrollHeight
        }
    }
    const debouncedHandleScroll = debounce(handleScroll, 100);

    const firstRenders = useRef(0)
    useEffect(() => {
        if (firstRenders.current !== 3) {
            firstRenders.current++
            return
        }

        const chatWindow = chatWindowRef.current

        if (isNewMessage.current) {
            const scrollDown = () => {
                if (chatWindow.scrollTop === 0){
                    chatWindow.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })
                }
            }
            scrollDown()
            isNewMessage.current = false
        }
        else {
            const scrollToPreviousPosition = () =>  {
                const currentScrollHeight = chatWindow.scrollHeight
                const addedHeight = currentScrollHeight - prevScrollheight.current
                chatWindow.scrollTop = -chatWindow.scrollHeight
                chatWindow.scrollTop += addedHeight
            }

            setTimeout(() =>  scrollToPreviousPosition(), 10)
        }
    }, [messageHistory]);

    const firstRender2 = useRef(0)
    useEffect(() => {
        if (firstRender2.current !== 2){
            firstRender2.current++
            return
        }

        const notification = new Audio('src/assets/mixkit-message-pop-alert-2354.mp3')
        notification.volume = 0.5
        notification.play()

        let updatedMsgHistory = [lastMessage]
        updatedMsgHistory = updatedMsgHistory.concat(messageHistory)
        setMessageHistory(updatedMsgHistory)
        newMessageCount.current++

        isNewMessage.current = true
    }, [lastMessage]);

    useLayoutEffect(() => {
        messageSequence.current = { skip: 0, take: 15 }
        setForceRemount(true)
        setTimeout(() => setForceRemount( false), 10)
    }, [openChatTab]);

    return (
        <>
            <ChatList
                key={forceRemount}
                force={forceRemount}
                chatWindowRef={chatWindowRef}
                handleScroll={debouncedHandleScroll}
                messageHistory={messageHistory}
            />
        </>
    )
}

export default ChatWindow
