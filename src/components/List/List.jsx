import ChatList from './ChatList/ChatList';
import './list.css';
import UserInfo from './UserInfo/UserInfo';

export default function List() {
  return (
    <div className='list-container'>
      <UserInfo />
      <ChatList />
    </div>
  )
}
