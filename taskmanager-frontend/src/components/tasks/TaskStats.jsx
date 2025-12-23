import React from 'react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Tasks due soon (within 3 days)
  const dueSoon = tasks.filter(t => {
    if (t.completed) return false;
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  }).length;
  
  // Overdue tasks
  const overdue = tasks.filter(t => {
    if (t.completed) return false;
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-md-3">
        <div className="card border-primary shadow-sm">
          <div className="card-body text-center">
            <h3 className="text-primary mb-1">{totalTasks}</h3>
            <small className="text-muted">Total Tasks</small>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card border-success shadow-sm">
          <div className="card-body text-center">
            <h3 className="text-success mb-1">{completedTasks}</h3>
            <small className="text-muted">Completed</small>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card border-info shadow-sm">
          <div className="card-body text-center">
            <h3 className="text-info mb-1">{pendingTasks}</h3>
            <small className="text-muted">Pending</small>
          </div>
        </div>
      </div>
      
      <div className="col-6 col-md-3">
        <div className="card border-warning shadow-sm">
          <div className="card-body text-center">
            <h3 className="text-warning mb-1">{dueSoon}</h3>
            <small className="text-muted">Due Soon</small>
          </div>
        </div>
      </div>
      
      {overdue > 0 && (
        <div className="col-12">
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <span>You have <strong>{overdue}</strong> overdue task{overdue > 1 ? 's' : ''}!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;