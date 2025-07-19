import { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
    const userData = useContext(UserContext);

    return (
        <div style={{
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '5px',
            border: '2px solid #007bff'
        }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>User Details</h4>
            <p style={{
                fontSize: '1.1rem',
                margin: '8px 0',
                color: '#555'
            }}>
                <strong>Name:</strong> {userData.name}
            </p>
            <p style={{
                fontSize: '1.1rem',
                margin: '8px 0',
                color: '#555'
            }}>
                <strong>Email:</strong> {userData.email}
            </p>
        </div>
    );
}

export default UserDetails;