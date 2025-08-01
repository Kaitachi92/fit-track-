import React, { useState } from 'react';
import Header from './components/Header';
import DaySelector from './components/DaySelector';
import WorkoutDay from './components/WorkoutDay';
import AuthForm from './components/AuthForm';
import { workoutData, getCurrentDay } from './data/workouts';
import { useWorkoutProgress } from './hooks/useWorkoutProgress';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const { 
    currentUser, 
    isLoading, 
    register, 
    login, 
    logout, 
    updateUser,
    deleteAccount,
    isAuthenticated 
  } = useAuth();

  const { 
    workoutData: workouts, 
    toggleExerciseComplete, 
    getDayStats,
    addExercise,
    updateExercise,
    removeExercise,
    updateDayTitle
  } = useWorkoutProgress(workoutData, currentUser?.id);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleToggleComplete = (exerciseId) => {
    toggleExerciseComplete(exerciseId);
  };

  const handleAddExercise = (day, exerciseData) => {
    addExercise(day, exerciseData);
  };

  const handleUpdateExercise = (day, exerciseId, exerciseData) => {
    updateExercise(day, exerciseId, exerciseData);
  };

  const handleRemoveExercise = (day, exerciseId) => {
    removeExercise(day, exerciseId);
  };

  const handleUpdateDayTitle = (day, newTitle) => {
    updateDayTitle(day, newTitle);
  };

  const handleLogin = async (email, password) => {
    await login(email, password);
  };

  const handleRegister = async (name, email, password) => {
    await register(name, email, password);
  };

  const handleLogout = () => {
    logout();
    setSelectedDay(getCurrentDay()); // Reset to current day
  };

  const handleUpdateUser = (userData) => {
    updateUser(userData);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    setSelectedDay(getCurrentDay()); // Reset to current day
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="app loading">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <p>Carregando FitTrack...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="app">
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    );
  }

  // Show main app if authenticated
  const selectedDayData = workouts[selectedDay];
  const dayStats = getDayStats(selectedDay);

  return (
    <div className="app">
      <Header 
        selectedDay={selectedDay}
        completedExercisesToday={dayStats.completed}
        totalExercisesToday={dayStats.total}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
      />
      
      <main className="main-content">
        <DaySelector 
          selectedDay={selectedDay}
          onDayChange={handleDayChange}
        />
        
        <WorkoutDay
          dayData={selectedDayData}
          dayName={selectedDay}
          onToggleComplete={handleToggleComplete}
          onAddExercise={handleAddExercise}
          onUpdateExercise={handleUpdateExercise}
          onRemoveExercise={handleRemoveExercise}
          onUpdateDayTitle={handleUpdateDayTitle}
        />
      </main>
    </div>
  );
}

export default App;
