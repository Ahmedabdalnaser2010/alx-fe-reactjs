import UserInfo from './UserInfo';

function ProfilePage() {
    return (
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Profile Page</h2>
            <UserInfo />
        </div>
    );
}

export default ProfilePage;