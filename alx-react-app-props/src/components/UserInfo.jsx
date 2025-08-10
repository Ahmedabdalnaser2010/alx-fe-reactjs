import UserDetails from './UserDetails';

function UserInfo() {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
        }}>
            <h3 style={{ color: '#555', marginBottom: '15px' }}>User Information</h3>
            <UserDetails />
        </div>
    );
}

export default UserInfo;