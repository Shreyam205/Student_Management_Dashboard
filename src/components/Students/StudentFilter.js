import React, { useState, useEffect } from 'react';
import { getCourses } from '../../services/studentService';
import './StudentFilter.css';

const StudentFilter = ({ onFilterChange }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const availableCourses = await getCourses();
      setCourses(['All', ...availableCourses]); // Add 'All' option
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    onFilterChange(course === 'All' ? '' : course);
  };

  return (
    <div className="student-filter">
      <label htmlFor="course-filter">Filter by Course: </label>
      <select id="course-filter" value={selectedCourse} onChange={handleCourseChange}>
        {courses.map(course => (
          <option key={course} value={course}>{course}</option>
        ))}
      </select>
    </div>
  );
};

export default StudentFilter;