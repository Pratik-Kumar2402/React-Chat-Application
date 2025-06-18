import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import './addUser.css';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import useUserStore from '../../../../lib/userStore';
import { toast } from 'react-toastify';

export default function AddUser() {
    const [user, setUser] = useState(null);
    const [added, setAdded] = useState(false);
    const { currentUser } = useUserStore();

    const handleKey = (event) => {
        if (event.key === "Enter") {
            handleSearch;
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('addEmail');

        try {
            const userRef = collection(db, "users");
            const querySnapshot = query(userRef, where("email", "==", email));

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

        if (user) {
            const userChatsRef = doc(userChatRef, currentUser.uid);
            const userSnapshot = await getDoc(userChatsRef);

            if (userSnapshot.exists()) {
                const userChatsData = userSnapshot.data();
                const chats = userChatsData.chats || [];

                // Check if any chat has receiverId matching searchedUserId
                const alreadyExists = chats.some(chat => chat.receiverId === user.uid);

                if (alreadyExists) {
                    toast.warn("User already exists in chats!");
                    return;
                }
            }
        }

        try {
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatRef, user.uid), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: currentUser.uid,
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatRef, currentUser.uid), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: user.uid,
                    updatedAt: Date.now(),
                })
            });

            setAdded(true);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

    if (added) return null; // Hide the AddUser container

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input onKeyDown={(event) => handleKey(event)} type='text' name='addEmail' placeholder='Enter email' />
                <button type='submit'>Search User</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src="/user.png" alt="" />
                        <span>{user.email}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
}