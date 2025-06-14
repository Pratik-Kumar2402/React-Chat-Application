import { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
// import { upload } from '../../lib/upload';

export default function Login() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });

    const [loading, setLoading] = useState(false);

    const handleAvatarChange = (event) => {
        if (event.target.files) {
            setAvatar({
                file: event.target.files[0],
                url: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);

        const { username, email, password } = Object.fromEntries(formData.entries());


        try {
            if (!username || !email || !password) {
                throw new Error('All fields are required');
            }

            // if (!avatar.file) {
            //     throw new Error('Profile picture is required');
            // }

            // You can add more validation logic here if needed
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // const imgURL = await upload(avatar.file); // Assuming you have an upload function to handle file uploads

            await setDoc(doc(db, 'users', res.user.uid), {
                username,
                email,
                id: res.user.uid,
                // photoURL: imgURL || '/user.png',
                blocked: [],
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {
                chats: [],
            });

            toast.success('Registration successful! Please proceed to log in.');
        } catch (error) {
            toast.error(error.message);
            return;
        } finally {
            setLoading(false);
        }

        // Handle registration logic here
        // For example, you can send formData to your backend API

    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);

        const { email, password } = Object.fromEntries(formData.entries());

        try {
            if (!email || !password) {
                throw new Error('All fields are required');
            }

            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
        } catch (error) {
            toast.error(error.message);
            return;
        } finally {
            setLoading(false);
        }

        // Handle login logic here
        // For example, you can send formData to your backend API
    }

    return (
        <div className="login-container">
            <div className="item">
                <h2>Welcome Back!</h2>
                <form action="" onSubmit={handleLogin}>
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button disabled={loading} type="submit">{loading ? 'Logging In...' : 'Login'}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form action="" onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || '/user.png'} alt="" />
                        Upload Profile Picture
                    </label>
                    <input type="file" name="file" id="file" hidden onChange={handleAvatarChange} />
                    <input type="text" name="regUsername" id="regUsername" placeholder="Username" />
                    <input type="email" name="regEmail" id="regEmail" placeholder='Email' />
                    <input type="password" name="regPassword" id="regPassword" placeholder='Password' />
                    <button disabled={loading} type="submit">{loading ? 'Signing Up...' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
}