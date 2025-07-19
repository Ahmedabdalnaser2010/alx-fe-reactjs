function Home() {
    return (
        <div style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: 'calc(100vh - 200px)'
        }}>
            <h1 style={{ color: '#333', fontSize: '2.5rem' }}>Welcome to Our Company</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                We are dedicated to delivering excellence in all our services. Our team of professionals
                is committed to providing innovative solutions tailored to your needs.
            </p>
        </div>
    );
}

export default Home;