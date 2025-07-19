function About() {
    return (
        <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>About Us</h1>
            <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>
                Founded in 1990, our company has been at the forefront of industry innovation.
                We specialize in various fields including technology, marketing, and consultancy.
            </p>
            <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>
                Our mission is to empower businesses through cutting-edge solutions and strategic
                partnerships that drive growth and efficiency.
            </p>
        </div>
    );
}

export default About;