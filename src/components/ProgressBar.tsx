
import React from 'react';
import { useAppState } from '../contexts/AppStateContext';

const ProgressBar = () => {
  const { getProgressPercentage } = useAppState();
  const percentage = getProgressPercentage();

  return (
    <div className="progress mb-3" role="progressbar" aria-label="Progress" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
      <div 
        className="progress-bar rounded transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
