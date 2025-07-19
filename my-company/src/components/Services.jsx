function Services() {
    const services = [
        { name: 'Technology Consulting', description: 'Expert advice on implementing the right technology solutions for your business.' },
        { name: 'Market Analysis', description: 'Comprehensive research to understand your market position and opportunities.' },
        { name: 'Product Development', description: 'End-to-end product development from concept to launch.' },
        { name: 'Digital Marketing', description: 'Strategies to enhance your online presence and customer engagement.' }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>Our Services</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {services.map((service, index) => (
                    <li key={index} style={{
                        margin: '1rem 0',
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ marginTop: 0 }}>{service.name}</h3>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Services;