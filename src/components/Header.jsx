import React, { useState } from 'react';
import { Dumbbell, Calendar, Flame, User, ChevronDown } from 'lucide-react';
import UserProfile from './UserProfile';
import './Header.css';

const Header = ({ 
  selectedDay, 
  completedExercisesToday, 
  totalExercisesToday, 
  currentUser, 
  onUpdateUser, 
  onLogout 
}) => {
  const [showProfile, setShowProfile] = useState(false);

  const formatDay = (day) => {
    const dayNames = {
      monday: 'Segunda-feira',
      tuesday: 'Terça-feira', 
      wednesday: 'Quarta-feira',
      thursday: 'Quinta-feira',
      friday: 'Sexta-feira',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };
    return dayNames[day] || day;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeleteAccount = () => {
    // Esta função será implementada no componente pai
    onLogout(); // Por agora, apenas fazer logout
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-icon">
              <Dumbbell size={28} />
            </div>
            <div className="brand-text">
              <h1 className="app-title">FitTrack</h1>
              <p className="app-subtitle">Seu companheiro de treino</p>
            </div>
          </div>

          <div className="date-section">
            <div className="date-info">
              <Calendar size={20} />
              <div className="date-text">
                <span className="current-date">{getCurrentDate()}</span>
                <span className="selected-day">Visualizando: {formatDay(selectedDay)}</span>
              </div>
            </div>
          </div>

          <div className="user-section">
            <div className="stat-card">
              <div className="stat-icon">
                <Flame size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{completedExercisesToday}</span>
                <span className="stat-label">Concluídos</span>
              </div>
            </div>

            {currentUser && (
              <div className="user-menu">
                <button 
                  className="user-button" 
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                  <div className="user-info">
                    <span className="user-name">{currentUser.name}</span>
                    <span className="user-email">{currentUser.email}</span>
                  </div>
                  <ChevronDown size={16} className={`chevron ${showProfile ? 'rotated' : ''}`} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showProfile && currentUser && (
        <div className="profile-dropdown">
          <UserProfile
            user={currentUser}
            onUpdateUser={onUpdateUser}
            onLogout={() => {
              setShowProfile(false);
              onLogout();
            }}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
      )}
    </>
  );
};

export default Header;
