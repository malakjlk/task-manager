import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdated }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 card shadow-sm">
        <div className="card-body">
          <div style={{ fontSize: '5rem', opacity: 0.3 }}></div>
          <h3 className="text-muted mt-3 mb-2">No tasks yet</h3>
          <p className="text-muted">Add your first task to get started!</p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      {pendingTasks.length > 0 && (
        <div className="mb-4">
          <h4 className="text-muted mb-3">
            Pending Tasks ({pendingTasks.length})
          </h4>
          <div className="d-flex flex-column gap-3">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h4 className="text-muted mb-3">
            Completed Tasks ({completedTasks.length})
          </h4>
          <div className="d-flex flex-column gap-3">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;