import React, { useEffect, useState } from 'react';
import { getEmployees, getDepartments, getAttendance, getLeaves } from '../services/api';

const StatCard = ({ title, value, color }) => (
  <div className="glass" style={{ padding: '2rem', flex: 1, margin: '0 1rem', borderTop: `4px solid ${color}` }}>
    <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
    <h1 style={{ fontSize: '3rem', margin: 0 }}>{value}</h1>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ employees: 0, departments: 0, present: 0, pendingLeaves: 0 });

  useEffect(() => {
    // In a real app, we'd have a specific stats endpoint, but here we'll mock fetch counts
    // or fetch list and count (inefficient but works for small demo)
    const fetchData = async () => {
        try {
            const [emps, depts, atts, leaves] = await Promise.all([
                getEmployees(),
                getDepartments(),
                getAttendance(),
                getLeaves()
            ]);
            setStats({
                employees: emps.data.length,
                departments: depts.data.length,
                present: atts.data.filter(a => a.status === 'Present').length,
                pendingLeaves: leaves.data.filter(l => l.status === 'Pending').length
            });
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div style={{ display: 'flex', marginTop: '2rem', marginLeft: '-1rem', marginRight: '-1rem' }}>
        <StatCard title="Total Employees" value={stats.employees} color="#6366f1" />
        <StatCard title="Departments" value={stats.departments} color="#a855f7" />
        <StatCard title="Present Today" value={stats.present} color="#10b981" />
        <StatCard title="Pending Leaves" value={stats.pendingLeaves} color="#ef4444" />
      </div>
      
      <div className="glass" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary">Add Employee</button>
            <button className="btn btn-primary" style={{ background: 'rgba(255,255,255,0.1)' }}>View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
