import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import './addUser.css';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import useUserStore from '../../../../lib/userStore';

export default function AddUser() {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('addUsername');

        try {
            const userRef = collection(db, "users");
            const querySnapshot = query(userRef, where("username", "==", username));

            const userQuery = await getDocs(querySnapshot);

            if (!userQuery.empty) {
                setUser(userQuery.docs[0].data());
            }
        } catch (error) {
            console.error("Error searching for user:", error);
        }
    }

    const handleAdd = async () => {
        if (!user) return;
        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userChats");

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type='text' name='addUsername' placeholder='Enter username' />
                <button type='submit'>Search User</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "/user.png"} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
}