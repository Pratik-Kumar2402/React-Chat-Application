import './detail.css';

export default function Detail() {
  return (
    <div className='detail-container'>
      <div className="user">
        <img src="/user.png" alt="User" />
        <h2>Jane Doe</h2>
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
        <button>Block User</button>
        <button className='logout-button'>Log Out</button>
      </div>
    </div>
  )
}
