import { mockEmployees, mockDepartments, mockAttendance, mockLeaves } from './mockData';

// Helper to handle LocalStorage persistence
const getFromStorage = (key, defaultData) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultData;
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

// Initialize data from LocalStorage or fall back to Mock Data
let employeesData = getFromStorage('hrms_employees', mockEmployees);
let departmentsData = getFromStorage('hrms_departments', mockDepartments);
let attendanceData = getFromStorage('hrms_attendance', mockAttendance);
let leavesData = getFromStorage('hrms_leaves', mockLeaves);

// Ensure IDs don't collide when adding new items
let nextEmployeeId = employeesData.length > 0 ? Math.max(...employeesData.map(e => e.id)) + 1 : 1;

const createMockResponse = (data) => Promise.resolve({ data });

export const getEmployees = () => {
  console.log('Fetching employees (Persistent)', employeesData);
  return createMockResponse(employeesData);
};

export const getDepartments = () => createMockResponse(departmentsData);
export const getAttendance = () => createMockResponse(attendanceData);
export const getLeaves = () => createMockResponse(leavesData);

export const createEmployee = (data) => {
  console.log("Creating employee:", data);
  const dept = departmentsData.find(d => d.id == data.department);
  
  const newEmployee = {
    id: nextEmployeeId++,
    ...data,
    first_name: data.first_name || 'FirstName',
    last_name: data.last_name || 'LastName',
    department_name: dept ? dept.name : 'Unknown',
    is_active: data.is_active !== undefined ? data.is_active : true
  };
  
  employeesData.push(newEmployee);
  saveToStorage('hrms_employees', employeesData);
  
  return createMockResponse(newEmployee);
};

export const updateEmployee = (id, data) => {
  const index = employeesData.findIndex(e => e.id === id);
  if (index !== -1) {
    // Update fields
    employeesData[index] = { ...employeesData[index], ...data };
    
    // Update department name if department ID changed
    if (data.department) {
       const dept = departmentsData.find(d => d.id == data.department);
       if (dept) employeesData[index].department_name = dept.name;
    }
    
    saveToStorage('hrms_employees', employeesData);
    return createMockResponse(employeesData[index]);
  }
  return Promise.reject("Employee not found");
};

export const deleteEmployee = (id) => {
  employeesData = employeesData.filter(e => e.id !== id);
  saveToStorage('hrms_employees', employeesData);
  return createMockResponse({ success: true });
};

export default {
  getEmployees,
  getDepartments,
  getAttendance,
  getLeaves,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
