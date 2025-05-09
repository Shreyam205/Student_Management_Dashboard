import React from 'react';
import { Link } from 'react-router-dom';
import './StudentItem.css';

const StudentItem = ({ student }) => {
  return (
    <div className="student-item">
      <h3>{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Course: {student.course}</p>
      <Link to={`/student/${student.id}`} className="details-link">View Details</Link>
    </div>
  );
};

export default StudentItem;