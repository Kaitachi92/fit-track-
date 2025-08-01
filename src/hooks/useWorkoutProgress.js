import { useState, useEffect } from 'react';

// Hook para gerenciar o progresso dos exercícios no localStorage por usuário
export const useWorkoutProgress = (initialData, userId = null) => {
  const [workoutData, setWorkoutData] = useState(initialData);

  // Gerar chave única para cada usuário
  const getStorageKey = () => {
    return userId ? `fittrack-progress-${userId}` : 'fittrack-progress';
  };

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    if (!userId) return; // Não carregar se não tiver usuário

    const savedProgress = localStorage.getItem(getStorageKey());
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        
        // Mesclar dados salvos com dados iniciais
        const mergedData = { ...initialData };
        Object.keys(mergedData).forEach(day => {
          if (parsedProgress[day]) {
            // Se o usuário tem dados salvos para este dia, usar eles
            mergedData[day] = {
              title: parsedProgress[day].title || mergedData[day].title,
              exercises: parsedProgress[day].exercises || []
            };
          }
        });
        
        setWorkoutData(mergedData);
      } catch (error) {
        console.error('Erro ao carregar progresso salvo:', error);
      }
    } else {
      // Se não há dados salvos, usar dados iniciais vazios para usuário logado
      const emptyData = {};
      Object.keys(initialData).forEach(day => {
        emptyData[day] = {
          title: initialData[day].title,
          exercises: []
        };
      });
      setWorkoutData(emptyData);
    }
  }, [userId, initialData]);

  // Salvar dados no localStorage sempre que houver mudança
  useEffect(() => {
    if (!userId) return; // Não salvar se não tiver usuário

    const progressToSave = {};
    Object.keys(workoutData).forEach(day => {
      progressToSave[day] = {
        title: workoutData[day].title,
        exercises: workoutData[day].exercises.map(ex => ({
          id: ex.id,
          name: ex.name,
          description: ex.description,
          sets: ex.sets,
          videoUrl: ex.videoUrl,
          completed: ex.completed
        }))
      };
    });
    
    localStorage.setItem(getStorageKey(), JSON.stringify(progressToSave));
  }, [workoutData, userId]);

  // Função para alternar o status de conclusão de um exercício
  const toggleExerciseComplete = (exerciseId) => {
    setWorkoutData(prevData => {
      const newData = { ...prevData };
      
      // Encontrar e atualizar o exercício
      Object.keys(newData).forEach(day => {
        const exerciseIndex = newData[day].exercises.findIndex(
          ex => ex.id === exerciseId
        );
        
        if (exerciseIndex !== -1) {
          newData[day] = {
            ...newData[day],
            exercises: newData[day].exercises.map((ex, index) =>
              index === exerciseIndex 
                ? { ...ex, completed: !ex.completed }
                : ex
            )
          };
        }
      });
      
      return newData;
    });
  };

  // Função para resetar o progresso de um dia específico
  const resetDayProgress = (day) => {
    setWorkoutData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        exercises: prevData[day].exercises.map(ex => ({
          ...ex,
          completed: false
        }))
      }
    }));
  };

  // Função para resetar todo o progresso
  const resetAllProgress = () => {
    const resetData = { ...initialData };
    Object.keys(resetData).forEach(day => {
      resetData[day].exercises = resetData[day].exercises.map(ex => ({
        ...ex,
        completed: false
      }));
    });
    setWorkoutData(resetData);
    localStorage.removeItem('fittrack-progress');
  };

  // Função para obter estatísticas
  const getStats = () => {
    let totalExercises = 0;
    let completedExercises = 0;
    
    Object.values(workoutData).forEach(day => {
      totalExercises += day.exercises.length;
      completedExercises += day.exercises.filter(ex => ex.completed).length;
    });
    
    return {
      totalExercises,
      completedExercises,
      completionPercentage: totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0
    };
  };

  // Função para obter estatísticas de um dia específico
  const getDayStats = (day) => {
    if (!workoutData[day]) return { total: 0, completed: 0, percentage: 0 };
    
    const exercises = workoutData[day].exercises;
    const completed = exercises.filter(ex => ex.completed).length;
    const total = exercises.length;
    
    return {
      total,
      completed,
      percentage: total > 0 ? (completed / total) * 100 : 0
    };
  };

  // Função para adicionar um novo exercício
  const addExercise = (day, newExercise) => {
    const newId = Date.now() + Math.random(); // ID mais único
    setWorkoutData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        exercises: [...prevData[day].exercises, { ...newExercise, id: newId, completed: false }]
      }
    }));
  };

  // Função para atualizar um exercício existente
  const updateExercise = (day, exerciseId, updatedExercise) => {
    setWorkoutData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        exercises: prevData[day].exercises.map(ex =>
          ex.id === exerciseId ? { ...ex, ...updatedExercise } : ex
        )
      }
    }));
  };

  // Função para remover um exercício
  const removeExercise = (day, exerciseId) => {
    setWorkoutData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        exercises: prevData[day].exercises.filter(ex => ex.id !== exerciseId)
      }
    }));
  };

  // Função para reordenar exercícios
  const reorderExercises = (day, startIndex, endIndex) => {
    setWorkoutData(prevData => {
      const exercises = [...prevData[day].exercises];
      const [removed] = exercises.splice(startIndex, 1);
      exercises.splice(endIndex, 0, removed);

      return {
        ...prevData,
        [day]: {
          ...prevData[day],
          exercises
        }
      };
    });
  };

  // Função para atualizar o título do treino do dia
  const updateDayTitle = (day, newTitle) => {
    setWorkoutData(prevData => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        title: newTitle
      }
    }));
  };

  return {
    workoutData,
    toggleExerciseComplete,
    resetDayProgress,
    resetAllProgress,
    getStats,
    getDayStats,
    addExercise,
    updateExercise,
    removeExercise,
    reorderExercises,
    updateDayTitle
  };
};
