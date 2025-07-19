import { useContext } from 'react';
import UserContext from '../UserContext';

function UserProfile() {
    const userData = useContext(UserContext);

    return (
        <div style={{
            border: '2px solid #ddd',
            padding: '20px',
            margin: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: 'blue',
                marginTop: '0',
                fontSize: '1.8rem',
                borderBottom: '2px solid blue',
                paddingBottom: '10px'
            }}>
                {userData.name}
            </h2>
            <p style={{
                fontSize: '1.1rem',
                margin: '10px 0',
                color: '#555'
            }}>
                <strong>Email:</strong> {userData.email}
            </p>
        </div>
    );
}

export default UserProfile;