import React, { useState } from 'react';

const ProfileMenu = ({ user, onLogout, onChangeAccount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const handleChangeAccount = () => {
    onChangeAccount();
    setIsOpen(false);
  };

  // Get first letter of user name
  const getInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'C'; // Default to 'C' to match the image
  };

  return (
    <div className="profile-menu-container">
      <div className="profile-avatar" onClick={toggleMenu}>
        <span className="avatar-letter">{getInitial()}</span>
      </div>
      
      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              <span className="avatar-letter">{getInitial()}</span>
            </div>
            <div className="user-info">
              <h4>{user?.name || 'chakir hiba'}</h4>
              <p>{user?.email || 'chakirhiba04@gmail.com'}</p>
            </div>
          </div>
          
          <div className="dropdown-separator"></div>
          
          <button className="dropdown-button" onClick={handleChangeAccount}>
            Changer de compte
          </button>
          
          <div className="dropdown-separator"></div>
          
          <button className="dropdown-button logout-button" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      )}
      
      {isOpen && <div className="dropdown-overlay" onClick={() => setIsOpen(false)}></div>}
      
      <style jsx>{`
        .profile-menu-container {
          position: relative;
          display: inline-block;
        }

        .profile-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ff360eff; /* Exact pink from the image */
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 10px rgba(255, 90, 165, 0.3);
        }

        .profile-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
        }

        .avatar-letter {
          color: white;
          font-weight: bold;
          font-size: 20px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .profile-dropdown {
          position: absolute;
          top: 60px;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 12px;
          padding: 20px;
          min-width: 280px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 1000;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .dropdown-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ff370aff; /* Exact pink from the image */
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .dropdown-avatar .avatar-letter {
          font-size: 20px;
        }

        .user-info {
          text-align: center;
        }

        .user-info h4 {
          margin: 0;
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .user-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .dropdown-separator {
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          margin: 15px 0;
        }

        .dropdown-button {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-bottom: 8px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .dropdown-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .dropdown-button:last-child {
          margin-bottom: 0;
        }

        .logout-button {
          border: none;
          background: transparent;
        }

        .logout-button:hover {
          background: rgba(255, 107, 157, 0.2);
        }

        .dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }
      `}</style>
    </div>
  );
};

export default ProfileMenu;