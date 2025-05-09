import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addStudent } from '../../services/studentService';
import './StudentForm.css'; // Create this file for styling

const StudentForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    course: '',
    // Add more fields as needed, e.g., for grades
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    course: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addStudent(values);
      alert('Student added successfully!');
      resetForm();
      navigate('/'); // Or to the student list page
    } catch (error) {
      console.error('Failed to add student:', error);
      alert('Failed to add student. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="student-form-container">
      <h2>Add New Student</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="student-form">
            <div className="form-control">
              <label htmlFor="name">Full Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email Address</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="course">Course</label>
              <Field type="text" id="course" name="course" />
              <ErrorMessage name="course" component="div" className="error" />
            </div>

            {/* Add more fields here */}

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Submitting...' : 'Add Student'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentForm;