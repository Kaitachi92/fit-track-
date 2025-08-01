import React, { useState } from 'react';
import { User, Mail, Calendar, Edit3, Save, X, LogOut, Trash2 } from 'lucide-react';
import './UserProfile.css';

const UserProfile = ({ user, onUpdateUser, onLogout, onDeleteAccount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  });
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user.name,
      email: user.email
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name,
      email: user.email
    });
    setErrors({});
  };

  const handleSave = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onUpdateUser(formData);
      setIsEditing(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus treinos serão perdidos.')) {
      onDeleteAccount();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={32} />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  <Save size={16} />
                  Salvar
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  <X size={16} />
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>{user.name}</h2>
              <div className="profile-details">
                <div className="detail-item">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>Membro desde {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </>
          )}
        </div>
        
        {!isEditing && (
          <button onClick={handleEdit} className="edit-profile-btn">
            <Edit3 size={16} />
          </button>
        )}
      </div>

      <div className="profile-actions">
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={16} />
          Sair da Conta
        </button>
        
        <button onClick={handleDeleteAccount} className="delete-account-btn">
          <Trash2 size={16} />
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
