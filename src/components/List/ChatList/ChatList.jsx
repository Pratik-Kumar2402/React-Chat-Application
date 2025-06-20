import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import useUserStore from '../../../lib/userStore';
import useChatStore from '../../../lib/chatStore';
import AddUser from './AddUser/AddUser';
import './chatList.css';
import React, { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [addMore, setAddMore] = useState(false);
  const [userInput, setUserInput] = useState('');

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.exists() ? userDocSnap.data() : null;
        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
    return () => {
      unSub();
    };
  }, [currentUser.uid]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user: _unused, ...rest } = item;

      return rest;
    })

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userChats', currentUser.uid);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredChats = chats.filter(c => c.user.email.toLowerCase().includes(userInput.toLowerCase()))

  return (
    <div className='chat-list'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search...' onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <img className="add" src={addMore ? "/minus.png" : "/plus.png"} alt="" onClick={() => setAddMore(!addMore)} />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe' }}>
          <img src="/user.png" alt="" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.uid) ? 'User' : chat.user.email}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMore && <AddUser />}
    </div>
  )
}
