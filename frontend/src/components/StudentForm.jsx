import { useState } from 'react';
import axios from 'axios';

function StudentForm({ onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from refreshing on submit

    try {
      const response = await axios.post('http://localhost:5000/api/students', formData);
      onStudentAdded(response.data); // tell the parent (App.jsx) a new student was added
      setFormData({ name: '', email: '', course: '' }); // clear the form
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Student</h2>

      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Course: </label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;