import './userInfo.css';

export default function UserInfo() {
  return (
    <div className='user-info'>
      <div className="user">
        <img src="/user.png" alt="" />
        <h3>John Doe</h3>
      </div>
      <div className="icons">
        <img src="/menu.png" alt="" />
        <img src="/video.png" alt="" />
        <img src="/edit.png" alt="" />
      </div>
    </div>
  )
}
