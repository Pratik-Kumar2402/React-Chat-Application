import { auth } from '../../../lib/firebase';
import useUserStore from '../../../lib/userStore';
import './userInfo.css';

export default function UserInfo() {
  const { currentUser } = useUserStore();

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
      <button className='logout-button' onClick={() => { auth.signOut() }}>Log Out</button>
    </>
  )
}
