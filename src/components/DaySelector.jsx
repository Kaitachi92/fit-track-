import React from 'react';
import { daysOfWeek, getCurrentDay } from '../data/workouts';
import './DaySelector.css';

const DaySelector = ({ selectedDay, onDayChange }) => {
  const currentDay = getCurrentDay();

  return (
    <div className="day-selector">
      <div className="days-container">
        {daysOfWeek.map((day) => (
          <button
            key={day.key}
            className={`day-button ${selectedDay === day.key ? 'active' : ''} ${currentDay === day.key ? 'today' : ''}`}
            onClick={() => onDayChange(day.key)}
          >
            <span className="day-short">{day.short}</span>
            <span className="day-full">{day.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
