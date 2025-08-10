import ProfilePage from './components/ProfilePage';
import UserContext from './components/UserContext';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px'
        }}>
          User Profile Application
        </h1>
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;