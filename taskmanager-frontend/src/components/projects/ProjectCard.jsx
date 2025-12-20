import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, progress }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="card h-100 shadow-sm"
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 0.5rem 1.5rem rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div className="card-body">
        <h5 className="card-title fw-bold mb-3">{project.title}</h5>
        
        {project.description && (
          <p className="card-text text-muted line-clamp-2 mb-3">
            {project.description}
          </p>
        )}

        {progress && (
          <div className="mt-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Progress</span>
              <span className="fw-bold text-primary">{progress.progressPercentage}%</span>
            </div>
            <div className="progress mb-2">
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${progress.progressPercentage}%` }}
                aria-valuenow={progress.progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="text-muted small">
              {progress.completedTasks} / {progress.totalTasks} tasks completed
            </div>
          </div>
        )}

        <div className="mt-3 text-muted small">
          <small>Created: {new Date(project.createdAt).toLocaleDateString()}</small>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;