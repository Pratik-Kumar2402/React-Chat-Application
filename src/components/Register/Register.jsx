import './register.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';


export default function Register() {

    // const checkUsernameExists = async (db, regUsername) => {
    //     const query = query(collection(db, 'users'), where('regUsername', '==', regUsername));
    //     const querySnapshot = await getDocs(query);
    //     return !querySnapshot.empty;
    // }

    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const { regEmail, regPassword } = Object.fromEntries(formData.entries());

        try {
            if (!regEmail || !regPassword) {
                throw new Error('All fields are required');
            }

            const response = await createUserWithEmailAndPassword(auth, regEmail, regPassword);

            await setDoc(doc(db, 'users', response.user.uid), {
                uid: response.user.uid,
                email: regEmail,
                blocked: [],
            });

            await setDoc(doc(db, 'userChats', response.user.uid), {
                chats: [],
            });

            toast.success('Registration successful!');
        } catch (err) {
            toast.error(err.message);
            return;
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const { email, password } = Object.fromEntries(formData.entries());

        try {
            if (!email || !password) {
                throw new Error('All fields are required');
            }

            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
        } catch (err) {
            toast.error(err.message);
            return;
        }
    }

    return (
        <>
            <div className="login-container">
                <h2>Welcome Back!</h2>
                <form action="" onSubmit={handleLogin}>
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button type="submit">Login In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className='register-container'>
                <h2>Create Account</h2>
                <form action="" onSubmit={handleRegister}>
                    <img src='/user.png' alt="user.png" />
                    <input type="email" name="regEmail" id="regEmail" placeholder='Email' />
                    <input type="password" name="regPassword" id="regPassword" placeholder='Password' />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}