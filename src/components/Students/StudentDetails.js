import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentById } from '../../services/studentService';
import './StudentDetails.css'; // Create this file for styling

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const data = await getStudentById(studentId);
        if (data) {
          setStudent(data);
          setError('');
        } else {
          setError('Student not found.');
          setStudent(null);
        }
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        setError('Failed to load student details.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) return <p className="loading-message">Loading student details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!student) return <p className="info-message">Student data is not available.</p>;

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>
      <div className="details-card">
        <h3>{student.name}</h3>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        {student.grades && (
          <div className="grades-section">
            <h4>Grades:</h4>
            <ul>
              {Object.entries(student.grades).map(([subject, grade]) => (
                <li key={subject}><strong>{subject.replace('_', ' ').toUpperCase()}:</strong> {grade}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Add more details as needed */}
      </div>
      <Link to="/" className="back-link">Back to Student List</Link>
    </div>
  );
};

export default StudentDetails;