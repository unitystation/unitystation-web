import React from 'react';

interface SmallNoteTextProps {
  text: string;
}

const SmallNoteText: React.FC<SmallNoteTextProps> = ({ text }) => {
  return (
    <p className="text-gray-400 text-sm mt-4">{text}</p>
  );
};

export default SmallNoteText; 