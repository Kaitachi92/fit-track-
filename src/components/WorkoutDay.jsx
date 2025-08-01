import React, { useState } from 'react';
import { Trophy, Target, CheckCircle2, Edit3, Plus, Save, X } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import ExerciseEditor from './ExerciseEditor';
import './WorkoutDay.css';

const WorkoutDay = ({ 
  dayData, 
  dayName, 
  onToggleComplete, 
  onAddExercise, 
  onUpdateExercise, 
  onRemoveExercise,
  onUpdateDayTitle 
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(dayData?.title || '');

  if (!dayData) {
    return (
      <div className="workout-day">
        <div className="empty-state">
          <Target size={48} color="#d1d5db" />
          <h3>Nenhum treino encontrado</h3>
          <p>Selecione um dia da semana para ver os exercícios.</p>
        </div>
      </div>
    );
  }

  const completedExercises = dayData.exercises.filter(ex => ex.completed).length;
  const totalExercises = dayData.exercises.length;
  const completionPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  const isWorkoutComplete = completedExercises === totalExercises && totalExercises > 0;

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
    setEditingExercise(null);
    setShowNewExerciseForm(false);
  };

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
    setShowNewExerciseForm(false);
  };

  const handleSaveExercise = (exerciseData) => {
    if (editingExercise) {
      onUpdateExercise(dayName, editingExercise.id, exerciseData);
    } else {
      onAddExercise(dayName, exerciseData);
    }
    
    setEditingExercise(null);
    setShowNewExerciseForm(false);
  };

  const handleDeleteExercise = (exerciseId) => {
    if (window.confirm('Tem certeza que deseja excluir este exercício?')) {
      onRemoveExercise(dayName, exerciseId);
      setEditingExercise(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingExercise(null);
    setShowNewExerciseForm(false);
  };

  const handleAddNewExercise = () => {
    setShowNewExerciseForm(true);
    setEditingExercise(null);
  };

  const handleTitleEdit = () => {
    setEditingTitle(true);
    setTempTitle(dayData.title);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      onUpdateDayTitle(dayName, tempTitle.trim());
    }
    setEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(dayData.title);
    setEditingTitle(false);
  };

  return (
    <div className="workout-day">
      <div className="workout-header">
        <div className="workout-title">
          {editingTitle ? (
            <div className="title-editor">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="title-input"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
              />
              <div className="title-actions">
                <button onClick={handleTitleSave} className="title-save">
                  <Save size={16} />
                </button>
                <button onClick={handleTitleCancel} className="title-cancel">
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="title-display">
              <h1>{dayData.title}</h1>
              {editMode && (
                <button onClick={handleTitleEdit} className="title-edit-btn">
                  <Edit3 size={16} />
                </button>
              )}
            </div>
          )}
          <p className="workout-subtitle">{dayName}</p>
        </div>
        
        <div className="workout-controls">
          <button 
            onClick={handleEditModeToggle} 
            className={`edit-mode-btn ${editMode ? 'active' : ''}`}
          >
            <Edit3 size={20} />
            {editMode ? 'Sair da Edição' : 'Editar Treino'}
          </button>
        </div>
        
        <div className="progress-section">
          <div className="progress-stats">
            <span className="progress-text">
              {completedExercises} de {totalExercises} exercícios
            </span>
            <span className="progress-percentage">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {isWorkoutComplete && !editMode && (
        <div className="completion-banner">
          <div className="completion-content">
            <div className="completion-icon">
              <Trophy size={32} />
            </div>
            <div className="completion-text">
              <h3>🎉 Parabéns!</h3>
              <p>Treino de hoje concluído com sucesso!</p>
            </div>
          </div>
        </div>
      )}

      {editMode && (
        <div className="edit-controls">
          <button onClick={handleAddNewExercise} className="add-exercise-btn">
            <Plus size={20} />
            Adicionar Exercício
          </button>
        </div>
      )}

      {(editingExercise || showNewExerciseForm) && (
        <ExerciseEditor
          exercise={editingExercise}
          onSave={handleSaveExercise}
          onDelete={handleDeleteExercise}
          onCancel={handleCancelEdit}
          isNew={showNewExerciseForm}
        />
      )}

      <div className="exercises-container">
        {dayData.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onToggleComplete={onToggleComplete}
            onEdit={handleEditExercise}
            editMode={editMode}
          />
        ))}
      </div>

      {dayData.exercises.length === 0 && (
        <div className="empty-exercises">
          <Target size={48} color="#d1d5db" />
          <h3>Nenhum exercício cadastrado</h3>
          <p>Clique em "Editar Treino" e depois em "Adicionar Exercício" para começar.</p>
        </div>
      )}

      {completedExercises > 0 && !isWorkoutComplete && !editMode && (
        <div className="motivation-message">
          <CheckCircle2 size={20} color="#22c55e" />
          <span>Continue assim! Você está indo muito bem!</span>
        </div>
      )}
    </div>
  );
};

export default WorkoutDay;
