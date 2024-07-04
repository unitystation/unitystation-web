import React from 'react';

export interface RuleProps {
  number: string;
  text: string;
  description?: string;
  subRules?: string[];
  postNotes?: string[];
}

const Rule: React.FC<RuleProps> = ({ number, text, description, subRules, postNotes }) => {
  return (
    <>
      <p>{number}. {text}</p>
      {description && (
        <p className="mb-2">{description}</p>
      )}
      {subRules && (
        <ul className="list-disc list-inside text-left pl-5">
          {subRules.map((subRule, index) => (
            <li key={index}>{subRule}</li>
          ))}
        </ul>
      )}
      {postNotes && (
        <ul className="list-none list-inside text-left pl-5">
          {postNotes.map((note, index) => (
            <li key={index} className='italic'>{note}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Rule;