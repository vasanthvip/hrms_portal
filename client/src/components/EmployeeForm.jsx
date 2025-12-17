import React, { useState, useEffect } from 'react';
import { getDepartments } from '../services/api';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    date_joined: new Date().toISOString().split('T')[0],
    is_active: true
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(res => setDepartments(res.data)).catch(console.error);
    if (employee) {
      setFormData({
        ...employee,
        department: employee.department // Ensure this maps correctly to ID
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>First Name</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Last Name</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
      </div>

      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone</label>
      <input name="phone" value={formData.phone} onChange={handleChange} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Designation</label>
          <input name="designation" value={formData.designation} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Salary</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Date Joined</label>
          <input type="date" name="date_joined" value={formData.date_joined} onChange={handleChange} required />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            name="is_active" 
            checked={formData.is_active} 
            onChange={handleChange} 
            style={{ width: 'auto', marginRight: '0.5rem', marginBottom: 0 }}
          />
          Is Active Employee
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={onCancel} className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
        <button type="submit" className="btn btn-primary">{employee ? 'Update Employee' : 'Create Employee'}</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
