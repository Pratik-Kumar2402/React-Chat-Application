import './App.css'
import List from './components/List/List'
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

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, you can set user state or perform actions
        fetchUserInfo(currentUser.uid);
        console.log('User is signed in:', currentUser);
      } else {
        // User is signed out, you can redirect to login or perform actions
        console.log('No user is signed in');
      }
    });
    return () => {
      // Cleanup the subscription when the component unmounts
      unSub();
    };
  }, [fetchUserInfo]);

  console.log('Current User:', currentUser);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <>
      <div className='container'>
        {currentUser ? (
          <>
            <List />
            <Chat />
            <Detail />
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
