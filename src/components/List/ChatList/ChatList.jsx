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

  console.log(chatId);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
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
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;

      return rest;
    })

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, 'userChats', currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  }

  const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(userInput.toLowerCase()))

  return (
    <div className='chat-list'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search...' onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <img className="add" src={addMore ? "/minus.png" : "/plus.png"} alt="" onClick={() => setAddMore((prev) => !prev)} />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)} style={{ backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe', }}>
          <img src={chat.user.blocked.includes(currentUser.id) ? '/user.png' : (chat.user.avatar || "/user.png")} alt="" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id) ? 'User' : chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMore && <AddUser />}
    </div>
  )
}
