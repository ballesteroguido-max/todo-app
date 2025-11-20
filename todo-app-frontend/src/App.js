import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Traer tareas desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Agregar nueva tarea
  const addTask = () => {
    if (!title) return;
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]));
    setTitle('');
  };

  // Marcar tarea como hecha/no hecha
  const toggleDone = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT'})
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(task => task.id === id ? updated : task));
      });
  };

  // Borrar tarea
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
      .then(() => setTasks(tasks.filter(task => task.id !== id)));
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', padding: 25, borderRadius: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
      
      <h1 style={{ textAlign: 'center', color: '#333' }}>📋 Mi To-Do App</h1>

      {/* Contador de tareas */}
      <div style={{ marginBottom: 20, textAlign: 'center', color: '#555' }}>
        <strong>Total:</strong> {tasks.length} | <strong>Completas:</strong> {tasks.filter(task => task.done).length}
      </div>

      {/* Input y botón agregar */}
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Nueva tarea" 
          style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc', fontSize: 16 }}
        />
        <button 
          onClick={addTask} 
          style={{ marginLeft: 10, padding: 10, borderRadius: 5, backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, marginBottom: 8, borderRadius: 5, backgroundColor: task.done ? '#d4edda' : 'white', border: '1px solid #ccc', transition: '0.3s' }}>
            
            <span 
              onClick={() => toggleDone(task.id)}
              style={{ textDecoration: task.done ? 'line-through' : 'none', cursor: 'pointer', flex: 1, color: task.done ? '#155724' : '#333' }}
            >
              {task.title}
            </span>

            <button 
              onClick={() => deleteTask(task.id)} 
              style={{ marginLeft: 10, padding: '5px 12px', borderRadius: 5, backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
