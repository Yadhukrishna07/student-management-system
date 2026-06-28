import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);

  // Fetch all students when the component first loads
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

  // Called by StudentForm after a successful add
  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [newStudent, ...prevStudents]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Student Management System</h1>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList students={students} />
    </div>
  );
}

export default App;