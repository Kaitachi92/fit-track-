import React, { useState } from 'react';
import { Play, Check, X, Edit3 } from 'lucide-react';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, onToggleComplete, onEdit, editMode = false }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoToggle = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const handleCompleteToggle = () => {
    onToggleComplete(exercise.id);
  };

  const handleEditClick = () => {
    onEdit(exercise);
  };

  return (
    <div className={`exercise-card ${exercise.completed ? 'completed' : ''} ${editMode ? 'edit-mode' : ''}`}>
      <div className="exercise-header">
        <div className="exercise-info">
          <h3 className="exercise-name">{exercise.name}</h3>
          <p className="exercise-description">{exercise.description}</p>
          <span className="exercise-sets">{exercise.sets}</span>
        </div>
        
        <div className="exercise-actions">
          {exercise.videoUrl && (
            <button 
              className="video-button"
              onClick={handleVideoToggle}
              title="Ver vídeo demonstrativo"
            >
              <Play size={20} />
            </button>
          )}
          
          {editMode && (
            <button 
              className="edit-button"
              onClick={handleEditClick}
              title="Editar exercício"
            >
              <Edit3 size={20} />
            </button>
          )}
          
          <button 
            className={`complete-button ${exercise.completed ? 'completed' : ''}`}
            onClick={handleCompleteToggle}
            title={exercise.completed ? 'Marcar como não feito' : 'Marcar como feito'}
          >
            {exercise.completed ? <Check size={20} /> : <div className="checkbox"></div>}
          </button>
        </div>
      </div>

      {isVideoOpen && exercise.videoUrl && (
        <div className="video-container">
          <div className="video-header">
            <h4>Demonstração: {exercise.name}</h4>
            <button 
              className="close-video-button"
              onClick={handleVideoToggle}
              title="Fechar vídeo"
            >
              <X size={20} />
            </button>
          </div>
          <div className="video-wrapper">
            <iframe
              src={exercise.videoUrl}
              title={exercise.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
