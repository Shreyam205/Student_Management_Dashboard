// src/services/studentService.js
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

const initialStudents = [
  { id: uuidv4(), name: 'Alice Wonderland', email: 'alice@example.com', course: 'Computer Science', grades: { math: 'A', science: 'B+' } },
  { id: uuidv4(), name: 'Bob The Builder', email: 'bob@example.com', course: 'Engineering', grades: { physics: 'A-', chemistry: 'A' } },
  { id: uuidv4(), name: 'Charlie Brown', email: 'charlie@example.com', course: 'Arts', grades: { history: 'B', literature: 'A' } },
  { id: uuidv4(), name: 'Diana Prince', email: 'diana@example.com', course: 'Computer Science', grades: { programming: 'A+', data_structures: 'A' } },
];

let students = [...initialStudents];

// Simulate API delay
const simulateApiCall = (data, delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const getStudents = async () => {
  console.log("Fetching students from mock API...");
  return simulateApiCall([...students]); // Return a copy
};

export const addStudent = async (studentData) => {
  console.log("Adding student to mock API:", studentData);
  const newStudent = { ...studentData, id: uuidv4() };
  students.push(newStudent);
  return simulateApiCall(newStudent);
};

export const getStudentById = async (id) => {
    console.log(`Workspaceing student with id ${id} from mock API...`);
    const student = students.find(s => s.id === id);
    return simulateApiCall(student || null);
};

// Function to get unique courses for filtering
export const getCourses = async () => {
    const allCourses = students.map(student => student.course);
    const uniqueCourses = [...new Set(allCourses)];
    return simulateApiCall(uniqueCourses);
};