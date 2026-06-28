import axios from 'axios';

function StudentList({ students, onStudentDeleted }) {
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      onStudentDeleted(id);
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student.');
    }
  };

  return (
    <div>
      <h2>Enrolled Students</h2>
      {students.length === 0 ? (
        <p className="empty-message">No students enrolled yet.</p>
      ) : (
        <div className="student-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;