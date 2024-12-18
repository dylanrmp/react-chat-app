import '../../../styles/App.css'
import ChatTab from './ChatTab.jsx'
import {useContext, useEffect} from "react";
import {ChatContext} from '../../../Contexts/ChatContext.jsx'

function ChatTabsWindow() {
    const { filteredChatTabs } = useContext(ChatContext)

    return (
        <>
            <div className="side-bar">
                {
                    filteredChatTabs.map((partner) => (
                    <ChatTab
                        partner={partner}
                        key={partner.userId}
                    />))
                }
            </div>
        </>
    )
}

export default ChatTabsWindow
