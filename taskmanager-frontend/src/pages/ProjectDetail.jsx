import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import TaskList from '../components/tasks/TaskList';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import ProgressBar from '../components/tasks/ProgressBar';
import TaskStats from '../components/tasks/TaskStats';
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
  
  // Search and Filter 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

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

  // Filter function
  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Filter by search item
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by status
    if (filterStatus === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filterStatus === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }
    
    return filtered;
  };

  //  fonction de sort
  const getSortedTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];
    
    switch (sortBy) {
      case 'dueDate':
        return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'created':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  };

  // Appliquer les filtres 
  const filteredTasks = getFilteredTasks();
  const filteredAndSortedTasks = getSortedTasks(filteredTasks);

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
           Back to Projects
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
        
        <TaskStats tasks={tasks} />

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

        {/* Search and filter bar */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tasks by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setSearchTerm('')}
                    >
                      
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending"> Pending Only</option>
                  <option value="completed">Completed Only</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="dueDate">Sort: Due Date</option>
                  <option value="title">  Sort: Title</option>
                  <option value="created">Sort: Created</option>
                </select>
              </div>
            </div>
            
            {(searchTerm || filterStatus !== 'all') && (
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Showing <strong>{filteredAndSortedTasks.length}</strong> of <strong>{tasks.length}</strong> task(s)
                  {searchTerm && <> matching "<strong>{searchTerm}</strong>"</>}
                </small>
                {(searchTerm || filterStatus !== 'all') && (
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <TaskList tasks={filteredAndSortedTasks} onTaskUpdated={fetchProjectData} />
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