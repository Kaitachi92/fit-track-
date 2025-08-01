import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import './ExerciseEditor.css';

const ExerciseEditor = ({ exercise, onSave, onDelete, onCancel, isNew = false }) => {
  const [formData, setFormData] = useState({
    name: exercise?.name || '',
    description: exercise?.description || '',
    sets: exercise?.sets || '',
    videoUrl: exercise?.videoUrl || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome do exercício é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.sets.trim()) {
      newErrors.sets = 'Séries/repetições são obrigatórias';
    }
    
    if (formData.videoUrl && !formData.videoUrl.includes('youtube.com/embed/')) {
      newErrors.videoUrl = 'URL deve ser um link do YouTube no formato embed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const exerciseData = {
      ...exercise,
      ...formData,
      id: exercise?.id || Date.now()
    };
    
    onSave(exerciseData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const convertYouTubeUrl = (url) => {
    if (!url) return '';
    
    // Converter URLs do YouTube para formato embed
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url;
  };

  const handleVideoUrlChange = (value) => {
    const convertedUrl = convertYouTubeUrl(value);
    handleChange('videoUrl', convertedUrl);
  };

  return (
    <div className="exercise-editor">
      <div className="editor-header">
        <h3>{isNew ? 'Novo Exercício' : 'Editar Exercício'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Exercício *</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex: Agachamento Livre"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Ex: Exercício fundamental para quadríceps"
            rows="3"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="sets">Séries/Repetições *</label>
          <input
            type="text"
            id="sets"
            value={formData.sets}
            onChange={(e) => handleChange('sets', e.target.value)}
            placeholder="Ex: 3x12 ou 4x10"
            className={errors.sets ? 'error' : ''}
          />
          {errors.sets && <span className="error-message">{errors.sets}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="videoUrl">URL do Vídeo (YouTube)</label>
          <input
            type="url"
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => handleVideoUrlChange(e.target.value)}
            placeholder="Ex: https://www.youtube.com/watch?v=..."
            className={errors.videoUrl ? 'error' : ''}
          />
          {errors.videoUrl && <span className="error-message">{errors.videoUrl}</span>}
          <small className="form-help">
            Cole o link do YouTube e ele será convertido automaticamente
          </small>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            <X size={16} />
            Cancelar
          </button>
          
          {!isNew && (
            <button type="button" onClick={() => onDelete(exercise.id)} className="btn-delete">
              <Trash2 size={16} />
              Excluir
            </button>
          )}
          
          <button type="submit" className="btn-save">
            <Save size={16} />
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseEditor;
