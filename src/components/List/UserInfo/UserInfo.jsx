import { auth, db } from '../../../lib/firebase';
import useUserStore from '../../../lib/userStore';
import useChatStore from '../../../lib/chatStore';
import './userInfo.css';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function UserInfo() {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.uid);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      })
      changeBlock()
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className='user-info'>
        <div className="user">
          <img src="/user.png" alt="" />
          <h3>{currentUser.email}</h3>
        </div>
        <div className="icons">
          <img src="/edit.png" alt="" />
        </div>
      </div>
      <button className='logout-button' type='button' onClick={() => { auth.signOut() }}>Log Out</button>
      <button className='block-button' type='button' onClick={handleBlock}>
        {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User Blocked" : "Block User"}
      </button>
    </>
  )
}
