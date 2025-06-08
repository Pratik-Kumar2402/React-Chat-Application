import './chatList.css';
import React, { useState } from 'react';

export default function ChatList() {
  const [addMore, setAddMore] = useState(false);

  return (
    <div className='chat-list'>
      <div className="search">
        <div className="searchBar">
          <img src="/public/search.png" alt="" />
          <input type="text" placeholder='Search...' />
        </div>
        <img className="add" src={addMore ? "/public/minus.png" : "/public/plus.png"} alt="" onClick={() => setAddMore(!addMore)} />
      </div>
      <div className="item">
        <img src="/public/user.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hey, how are you?</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/user.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hey, how are you?</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/user.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hey, how are you?</p>
        </div>
      </div>
      <div className="item">
        <img src="/public/user.png" alt="" />
        <div className="texts">
          <span>Jane Doe</span>
          <p>Hey, how are you?</p>
        </div>
      </div>
    </div>
  )
}
