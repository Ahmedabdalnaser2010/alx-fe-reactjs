import React from 'react'

const MainContent = () => {
    return (
        <main style={{
            padding: '20px',
            minHeight: '400px',
            backgroundColor: '#ffffff',
            margin: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{
                color: '#333',
                fontSize: '2rem',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                Welcome to My Application
            </h2>
            <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#555',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                I love to visit New York, Paris, and Tokyo.</p>
        </main>
    )
}

export default MainContent
