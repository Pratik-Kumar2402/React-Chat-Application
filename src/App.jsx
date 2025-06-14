import './App.css'
import List from './components/List/List'
import useChatStore from './lib/chatStore';
import Chat from './components/Chat/Chat'
import Detail from './components/Detail/Detail'
import Login from './components/Login/Login';
import Notification from './components/Notification/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import useUserStore from './lib/userStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      // User is signed in, you can set user state or perform actions
      fetchUserInfo(currentUser?.uid);
    });
    return () => {
      // Cleanup the subscription when the component unmounts
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <>
      <div className='container'>
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </>
  )
}

export default App
