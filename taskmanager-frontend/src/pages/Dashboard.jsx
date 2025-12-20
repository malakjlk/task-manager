import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProjectList from '../components/projects/ProjectList';
import CreateProjectModal from '../components/projects/CreateProjectModal';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProjectCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0">My Projects</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-lg"
          >
            <span className="me-2">+</span>
            New Project
          </button>
        </div>

        <ProjectList 
          refresh={refreshKey} 
          onRefreshComplete={() => {}}
        />
      </div>

      <CreateProjectModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Dashboard;