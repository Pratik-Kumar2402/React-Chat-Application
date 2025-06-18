import './App.css'
import { useEffect } from 'react';
import List from './components/List/List'
import Chat from './components/Chat/Chat'
import Register from './components/Register/Register';
import Notification from './components/Notification/Notification';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import useChatStore from './lib/chatStore';
import useUserStore from './lib/userStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      fetchUserInfo(currentUser?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <>
      <div className='container'>
        {currentUser ?
          <>
            <List />
            {chatId && <Chat />}
          </>
          :
          (<Register />)
        }
        <Notification />
      </div>
    </>
  )
}

export default App
