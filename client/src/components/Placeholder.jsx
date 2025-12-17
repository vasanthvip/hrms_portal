import React from 'react';

const Placeholder = ({ title }) => (
  <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</h1>
    <h2>{title} Under Construction</h2>
    <p style={{ color: 'var(--text-secondary)' }}>This module is coming soon.</p>
  </div>
);

export default Placeholder;
