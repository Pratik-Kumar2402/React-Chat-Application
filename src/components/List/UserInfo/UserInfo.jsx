import './userInfo.css';

export default function UserInfo() {
  return (
    <div className='user-info'>
      <div className="user">
        <img src="/public/user.png" alt="" />
        <h3>John Doe</h3>
      </div>
      <div className="icons">
        <img src="/public/menu.png" alt="" />
        <img src="/public/camera.png" alt="" />
        <img src="/public/edit.png" alt="" />
      </div>
    </div>
  )
}
