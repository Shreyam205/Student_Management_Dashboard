import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/studentService';
import StudentItem from './StudentItem';
import StudentFilter from './StudentFilter';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseFilter, setCourseFilter] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setFilteredStudents(data); // Initially show all students
        setError(null);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students. Please try again later.");
        setStudents([]);
        setFilteredStudents([]);
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  useEffect(() => {
    if (courseFilter === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter(student => student.course.toLowerCase() === courseFilter.toLowerCase())
      );
    }
  }, [courseFilter, students]);

  const handleFilterChange = (course) => {
    setCourseFilter(course);
  };

  if (loading) return <p className="loading-message">Loading students...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="student-list-container">
      <h2>Student Roster</h2>
      <StudentFilter onFilterChange={handleFilterChange} />
      {filteredStudents.length === 0 && !loading ? (
        <p>No students found matching your criteria.</p>
      ) : (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <StudentItem key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;