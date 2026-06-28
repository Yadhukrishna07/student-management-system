import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [newStudent, ...prevStudents]);
  };

  const handleStudentDeleted = (deletedId) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student._id !== deletedId));
  };

  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList students={students} onStudentDeleted={handleStudentDeleted} />
    </div>
  );
}

export default App;