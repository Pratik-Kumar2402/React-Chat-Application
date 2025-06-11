import { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';

export default function Login() {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });

    const handleAvatarChange = (event) => {
        if (event.target.files) {
            setAvatar({
                file: event.target.files[0],
                url: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login logic here

        toast.warning('Login functionality is not implemented yet!');
    }

    return (
        <div className="login-container">
            <div className="item">
                <h2>Welcome Back!</h2>
                <form action="" onSubmit={handleLogin}>
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form action="">
                    <label htmlFor="file">
                        <img src={avatar.url || '/user.png'} alt="" />
                        Upload Profile Picture
                    </label>
                    <input type="file" name="file" id="file" hidden onChange={handleAvatarChange} />
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}