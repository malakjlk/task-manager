import React from 'react';

const ProgressBar = ({ progress }) => {
  if (!progress) return null;

  const percentage = progress.progressPercentage || 0;
  
  // Déterminer la couleur en fonction du pourcentage
  let progressColor = 'bg-danger';
  if (percentage >= 75) {
    progressColor = 'bg-success';
  } else if (percentage >= 50) {
    progressColor = 'bg-info';
  } else if (percentage >= 25) {
    progressColor = 'bg-warning';
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3">Project Progress</h5>
        
        <div className="d-flex justify-content-between text-muted mb-2">
          <span>Completion</span>
          <span className="fw-bold fs-5 text-primary">{percentage}%</span>
        </div>

        <div className="progress mb-3" style={{ height: '20px' }}>
          <div
            className={`progress-bar ${progressColor}`}
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentage > 10 && <span className="fw-bold">{percentage}%</span>}
          </div>
        </div>

        <div className="d-flex justify-content-between text-muted small">
          <span>
            <strong>{progress.completedTasks}</strong> completed
          </span>
          <span>
            <strong>{progress.totalTasks}</strong> total tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;