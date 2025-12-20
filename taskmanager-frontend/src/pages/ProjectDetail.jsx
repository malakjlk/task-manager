import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import TaskList from '../components/tasks/TaskList';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import ProgressBar from '../components/tasks/ProgressBar';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectData, tasksData, progressData] = await Promise.all([
        projectService.getProjectById(id),
        taskService.getProjectTasks(id),
        projectService.getProjectProgress(id),
      ]);
      
      setProject(projectData);
      setTasks(tasksData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container py-5 text-center">
          <h2 className="text-muted">Project not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      
      <div className="container py-4">
        <button
          onClick={() => navigate('/')}
          className="btn btn-link text-primary mb-3 p-0"
        >
          ← Back to Projects
        </button>

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h1 className="card-title fw-bold mb-2">{project.title}</h1>
            {project.description && (
              <p className="card-text text-muted mb-0">{project.description}</p>
            )}
          </div>
        </div>

        <ProgressBar progress={progress} />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Tasks</h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-success btn-lg"
          >
            <span className="me-2">+</span>
            Add Task
          </button>
        </div>

        <TaskList tasks={tasks} onTaskUpdated={fetchProjectData} />
      </div>

      <CreateTaskModal
        show={showModal}
        onHide={() => setShowModal(false)}
        projectId={id}
        onTaskCreated={fetchProjectData}
      />
    </div>
  );
};

export default ProjectDetail;