import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import useChatStore from '../../lib/chatStore';
import { auth, db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import './detail.css';

export default function Detail() {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='detail-container'>
      <div className="user">
        <img src={user?.avatar || '/user.png'} alt="User" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="/arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/BB1msDMQ.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img className='icon' src="/download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/BB1msDMQ.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img className='icon' src="/download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="/BB1msDMQ.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img className='icon' src="/download.png" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked ? 'You are Blocked!' : isReceiverBlocked ? 'User blocked' : 'Block User'}
        </button>
        <button className='logout-button' onClick={() => { auth.signOut() }}>Log Out</button>
      </div>
    </div>
  )
}
