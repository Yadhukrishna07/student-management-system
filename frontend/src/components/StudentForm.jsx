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
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/students', formData);
      onStudentAdded(response.data);
      setFormData({ name: '', email: '', course: '' });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Add New Student</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Course</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Add Student</button>
    </form>
  );
}

export default StudentForm;