import React, {useState} from 'react';
import FriendList from "./FriendList.jsx";
import FriendSearchBar from "./FriendSearchBar.jsx";
import TopNavigationBar from "./TopNavigationBar.jsx";
import FriendRequestList from "./FriendRequestList.jsx";
import AddFriend from "./AddFriend.jsx";
import {WINDOW_STATES} from "./WINDOW_STATES.js";

function FriendWindow () {
    const [ currentWindow, setCurrentWindow ] = useState(WINDOW_STATES.FRIENDS);

    return (
      <>
          <TopNavigationBar setCurrentWindow={setCurrentWindow}></TopNavigationBar>
          {/*<FriendSearchBar></FriendSearchBar>*/}
          {currentWindow === WINDOW_STATES.FRIENDS && <FriendList />}
          {currentWindow === WINDOW_STATES.FRIENDREQUESTS && <FriendRequestList />}
          {currentWindow === WINDOW_STATES.ADDFRIENDS && <AddFriend />}
      </>
    );
}

export default FriendWindow