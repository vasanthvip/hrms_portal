import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaBuilding, FaCalendarCheck, FaFileAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <FaHome /> },
    { path: '/employees', name: 'Employees', icon: <FaUsers /> },
    { path: '/departments', name: 'Departments', icon: <FaBuilding /> },
    { path: '/attendance', name: 'Attendance', icon: <FaCalendarCheck /> },
    { path: '/leaves', name: 'Leaves', icon: <FaFileAlt /> },
  ];

  return (
    <div className="glass-panel" style={{ width: '250px', height: '100vh', padding: '2rem' }}>
      <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>HRMS Portal</h2>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              marginBottom: '0.5rem',
              borderRadius: '0.5rem',
              background: location.pathname === item.path ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
              color: location.pathname === item.path ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ marginRight: '1rem', fontSize: '1.2rem' }}>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
