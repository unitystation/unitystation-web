import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg">
      {children}
    </div>
  );
};

export default Card;
