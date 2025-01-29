import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    const response = await axios.get('http://localhost/taskmanager/read_tasks.php');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put('http://localhost/taskmanager/update_task.php', { id: editId, ...task });
    } else {
      await axios.post('http://localhost/taskmanager/create_task.php', task);
    }
    setTask({ title: '', description: '' });
    setIsEditing(false);
    fetchTasks();
  };

  // Handle editing a task
  const handleEdit = (task) => {
    setTask({ title: task.title, description: task.description });
    setIsEditing(true);
    setEditId(task.id);
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    await axios.post('http://localhost/taskmanager/delete_task.php', { id });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;