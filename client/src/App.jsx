import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import Placeholder from './components/Placeholder';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/departments" element={<Placeholder title="Departments" />} />
            <Route path="/attendance" element={<Placeholder title="Attendance" />} />
            <Route path="/leaves" element={<Placeholder title="Leaves" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
