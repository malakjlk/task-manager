import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projectService } from '../../services/projectService';

const ProjectList = ({ refresh, onRefreshComplete }) => {
  const [projects, setProjects] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);

      const progressPromises = data.map(project =>
        projectService.getProjectProgress(project.id)
      );
      const progressResults = await Promise.all(progressPromises);
      
      const progressMap = {};
      progressResults.forEach(progress => {
        progressMap[progress.projectId] = progress;
      });
      setProgressData(progressMap);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      if (onRefreshComplete) onRefreshComplete();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: '5rem', opacity: 0.3 }}></div>
        <h3 className="text-muted mt-3 mb-2">No projects yet</h3>
        <p className="text-muted">Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {projects.map((project) => (
        <div key={project.id} className="col-12 col-md-6 col-lg-4">
          <ProjectCard
            project={project}
            progress={progressData[project.id]}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;