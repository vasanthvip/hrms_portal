import React, { useEffect, useState } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/api';
import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = () => {
    getEmployees().then(res => setEmployees(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createEmployee(data);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to create employee", error);
      alert('Failed to create employee');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateEmployee(selectedEmployee.id, data);
      setIsModalOpen(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to update employee", error);
      alert('Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to delete employee", error);
        alert('Failed to delete employee');
      }
    }
  };

  const openCreateModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Employees</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>Add New Employee</button>
      </div>
      
      <div className="glass" style={{ padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Department</th>
              <th style={{ padding: '1rem' }}>Designation</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{emp.first_name} {emp.last_name}</td>
                <td style={{ padding: '1rem' }}>{emp.department_name}</td>
                <td style={{ padding: '1rem' }}>{emp.designation}</td>
                <td style={{ padding: '1rem' }}>{emp.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem', 
                    background: emp.is_active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: emp.is_active ? '#34d399' : '#f87171',
                    fontSize: '0.875rem'
                  }}>
                    {emp.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button 
                    onClick={() => openEditModal(emp)} 
                    style={{ background: 'transparent', color: '#6366f1', marginRight: '1rem', fontSize: '1.2rem' }}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(emp.id)} 
                    style={{ background: 'transparent', color: '#ef4444', fontSize: '1.1rem' }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
      >
        <EmployeeForm 
          employee={selectedEmployee} 
          onSubmit={selectedEmployee ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
