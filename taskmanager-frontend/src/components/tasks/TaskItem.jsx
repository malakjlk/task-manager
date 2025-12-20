import React from 'react';
import { taskService } from '../../services/taskService';

const TaskItem = ({ task, onTaskUpdated }) => {
const handleToggleComplete = async () => {
  try {
    console.log('Toggling task:', task.id); // ← AJOUTE CETTE LIGNE POUR DEBUG
    await taskService.toggleTaskCompletion(task.id);
    onTaskUpdated();
  } catch (error) {
    console.error('Error toggling task:', error); // ← Regarde cette erreur dans la console
    alert('Failed to update task: ' + error.message); // ← AJOUTE CETTE LIGNE
  }
};

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task.id);
        onTaskUpdated();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      className={`card shadow-sm ${task.completed ? 'border-success' : 'border-primary'}`}
      style={{ 
        borderLeft: `4px solid ${task.completed ? '#198754' : '#0d6efd'}`,
        backgroundColor: task.completed ? 'rgba(25, 135, 84, 0.05)' : 'white'
      }}
    >
      <div className="card-body">
        <div className="d-flex align-items-start">
         <input
  type="checkbox"
  checked={task.completed}
  onChange={handleToggleComplete}
  className="form-check-input me-3 mt-1"
  style={{ 
    width: '20px', 
    height: '20px',
    cursor: 'pointer'
  }}
/>
          
          <div className="flex-grow-1">
            <h5 className={`card-title mb-2 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {task.title}
            </h5>
            
            {task.description && (
              <p className="card-text text-muted mb-2">{task.description}</p>
            )}
            
            <div className="d-flex gap-3 small text-muted">
              <span>📅 Due: {formatDate(task.dueDate)}</span>
              {task.completed && (
                <span className="text-success fw-bold">✓ Completed</span>
              )}
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger ms-2"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;