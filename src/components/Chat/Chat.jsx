import { useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setOpen(false);
  }

  return (
    <div className='chat-container'>
      <div className="top">
        <div className="user">
          <img src="/user.png" alt="" />
          <div className="texts">
            <span>John Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="/phone.png" alt="" />
          <img src="/video.png" alt="" />
          <img src="/info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="/user.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div className="message">
          <img src="/user.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div className="message">
          <img src="/user.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            <img src="/BB1msG0V.jpeg" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus est delectus a deleniti quis quod aperiam explicabo perspiciatis molestias error eveniet, laudantium saepe laboriosam nam magnam quaerat nostrum maiores cumque.</p>
            <span>Just now</span>
          </div>
        </div>
        <div ref={el => el && el.scrollIntoView({ behavior: 'smooth' })}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="/image.png" alt="" />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>
        <input type="text" value={text} placeholder='Type a message...' onChange={(e) => setText(e.target.value)} />
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
        <button className='send-button'>Send</button>
      </div>
    </div>
  )
}
