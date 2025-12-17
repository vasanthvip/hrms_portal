import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div className="glass" style={{
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        background: '#1e293b',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            <FaTimes />
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
