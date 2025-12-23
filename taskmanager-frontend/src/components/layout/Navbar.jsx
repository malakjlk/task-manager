import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fw-bold fs-4">Task Manager</span>
        </Link>
        
        {user && (
          <div className="d-flex align-items-center">
            <span className="text-white me-3 d-none d-md-inline">
               <strong>{user.name}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-light btn-sm fw-bold"
              style={{ 
                borderRadius: '20px',
                padding: '0.5rem 1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;