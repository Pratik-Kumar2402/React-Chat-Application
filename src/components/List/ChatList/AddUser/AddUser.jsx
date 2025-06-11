import './addUser.css';

export default function AddUser() {
    return (
        <div className='addUser'>
            <form>
                <input type='text' id='username' placeholder='Enter username' />
                <button type='submit'>Search User</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="/user.png" alt="" />
                    <span>John Doe</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    );
}