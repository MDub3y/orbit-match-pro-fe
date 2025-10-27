import React from 'react';

const LoadingSpinner: React.FC<{ message: string; }> = ({ message }) => (
    <div className= "flex flex-col items-center justify-center p-8 mt-6 bg-blue-50/50 rounded-lg shadow-inner" >
    {/* Simple animated spinner */ }
    <div className = "w-8 h-8 border-4 border-t-4 border-t-orbit-primary border-gray-200 rounded-full animate-spin mb-3" > </div>
        <p className = "text-lg font-medium text-orbit-primary animate-pulse" > { message } </p>
            <p className = "text-sm text-gray-500 mt-1 italic" > Analyzing 18 + factors and scholarship data...</p>
                </div>
);

export default LoadingSpinner;