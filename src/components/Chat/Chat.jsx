import { useEffect, useState } from 'react';
import useChatStore from '../../lib/chatStore';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import { upload } from '../../lib/upload';


export default function Chat() {
  const [chatBox, setChatBox] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [img, setImg] = useState({
    file: null,
    url: '',
  })

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setOpen(false);
  }

  const handleImage = (event) => {
    if (event.target.files) {
      setImg({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0])
      });
    }
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

  const handleSend = async () => {
    if (text === '') return;

    let imgURL = null;

    try {
      if (img.file) {
        imgURL = await upload(img.file)
      }

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createAt: new Date(),
          ...(imgURL && { img: imgURL }),
        })
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (userId) => {

        const userChatRef = doc(db, 'userChats', userId);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(chat => chat.chatId === chatId);

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen = userId === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });

    } catch (error) {
      console.error("Error sending message:", error);
    }

    setImg({
      file: null,
      url: '',
    })

    setText('');
  }

  return (
    <div className='chat-container'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || '/user.png'} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
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
          <div className={message.senderId === currentUser?.id ? 'message owner' : 'message'} key={message?.createAt}>
            <div className="texts">
              {/* {message.img && <img src={message.img} alt="" />} */}
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message owner">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={el => el && el.scrollIntoView({ behavior: 'smooth' })}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="/image.png" alt="" />
          </label>
          <input type="file" id='file' hidden onChange={handleImage} />
        </div>
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
