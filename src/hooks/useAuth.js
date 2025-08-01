import { useState, useEffect } from 'react';

// Hook para gerenciar autenticação e dados de usuários
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário atual na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('fittrack-current-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('fittrack-current-user');
      }
    }
    setIsLoading(false);
  }, []);

  // Função para registrar novo usuário
  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Simular delay de rede
      setTimeout(() => {
        try {
          // Verificar se já existe um usuário com este email
          const existingUsers = getStoredUsers();
          const userExists = existingUsers.find(user => user.email === email);
          
          if (userExists) {
            reject(new Error('Este email já está em uso'));
            return;
          }

          // Criar novo usuário
          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            createdAt: new Date().toISOString()
          };

          // Salvar usuário na lista de usuários
          const updatedUsers = [...existingUsers, newUser];
          localStorage.setItem('fittrack-users', JSON.stringify(updatedUsers));
          
          // Salvar senha separadamente (em produção seria hash)
          const passwords = getStoredPasswords();
          passwords[email] = password;
          localStorage.setItem('fittrack-passwords', JSON.stringify(passwords));

          // Fazer login automático
          setCurrentUser(newUser);
          localStorage.setItem('fittrack-current-user', JSON.stringify(newUser));

          resolve(newUser);
        } catch (error) {
          reject(new Error('Erro ao criar conta. Tente novamente.'));
        }
      }, 1000);
    });
  };

  // Função para fazer login
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      // Simular delay de rede
      setTimeout(() => {
        try {
          const users = getStoredUsers();
          const passwords = getStoredPasswords();
          
          const user = users.find(u => u.email === email);
          
          if (!user) {
            reject(new Error('Email não encontrado'));
            return;
          }

          if (passwords[email] !== password) {
            reject(new Error('Senha incorreta'));
            return;
          }

          // Login bem-sucedido
          setCurrentUser(user);
          localStorage.setItem('fittrack-current-user', JSON.stringify(user));
          
          resolve(user);
        } catch (error) {
          reject(new Error('Erro ao fazer login. Tente novamente.'));
        }
      }, 1000);
    });
  };

  // Função para fazer logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fittrack-current-user');
  };

  // Função para atualizar dados do usuário
  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('fittrack-current-user', JSON.stringify(updatedUser));
    
    // Atualizar na lista de usuários também
    const users = getStoredUsers();
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    localStorage.setItem('fittrack-users', JSON.stringify(updatedUsers));
  };

  // Função para deletar conta
  const deleteAccount = () => {
    if (!currentUser) return;

    // Remover usuário da lista
    const users = getStoredUsers();
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    localStorage.setItem('fittrack-users', JSON.stringify(updatedUsers));

    // Remover senha
    const passwords = getStoredPasswords();
    delete passwords[currentUser.email];
    localStorage.setItem('fittrack-passwords', JSON.stringify(passwords));

    // Remover dados de treino do usuário
    localStorage.removeItem(`fittrack-progress-${currentUser.id}`);

    // Fazer logout
    logout();
  };

  // Funções auxiliares
  const getStoredUsers = () => {
    try {
      const users = localStorage.getItem('fittrack-users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const getStoredPasswords = () => {
    try {
      const passwords = localStorage.getItem('fittrack-passwords');
      return passwords ? JSON.parse(passwords) : {};
    } catch {
      return {};
    }
  };

  return {
    currentUser,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    deleteAccount,
    isAuthenticated: !!currentUser
  };
};
