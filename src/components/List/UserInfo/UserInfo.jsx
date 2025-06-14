import useUserStore from '../../../lib/userStore';
import './userInfo.css';

export default function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className='user-info'>
      <div className="user">
        <img src={currentUser.avatar || "/user.png"} alt="" />
        <h3>{currentUser.username}</h3>
      </div>
      <div className="icons">
        <img src="/menu.png" alt="" />
        <img src="/video.png" alt="" />
        <img src="/edit.png" alt="" />
      </div>
    </div>
  )
}
