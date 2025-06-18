import { useEffect, useState } from 'react';
import useChatStore from '../../lib/chatStore';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';


export default function Chat() {
  const [chatBox, setChatBox] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setOpen(false);
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      // Handle the snapshot data here
      setChatBox(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chatBox)

  const handleSend = async () => {
    if (text === '') return;

    try {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: Date.now(),
        })
      });

      const userIDs = [currentUser.uid, user.uid];

      userIDs.forEach(async (userId) => {

        const userChatRef = doc(db, 'userChats', userId);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(chat => chat.chatId === chatId);

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen = userId === currentUser.uid ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });

    } catch (error) {
      console.error("Error sending message:", error);
    }

    setText('');
  }

  return (
    <div className='chat-container'>
      <div className="top">
        <div className="user">
          <img src='/user.png' alt="" />
          <div className="texts">
            <span>{user?.email}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="/phone.png" alt="" />
          <img src="/info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chatBox?.messages?.map((message) => (
          <div className={message.senderId === currentUser?.uid ? 'message owner' : 'message'} key={message?.createAt}>
            <div className="texts">
              <p>{message.text}</p>
              <span>
                {new Date(message.createdAt).toLocaleString('en-US', {
                  dateStyle: 'short',
                  timeStyle: 'medium',
                  hour12: true,
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={el => el && el.scrollIntoView({ behavior: 'smooth' })}></div>
      </div>
      <div className="bottom">
        <input type="text" value={text} placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? `You can't send a message` : 'Type a message...'} onChange={(e) => setText(e.target.value)} disabled={isCurrentUserBlocked || isReceiverBlocked} />
        <div className="emoji">
          <img src="/emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker
              theme='dark'
              onEmojiClick={handleEmojiClick}
              open={open}
            />
          </div>
        </div>
        <button className='send-button' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </div>
  )
}
