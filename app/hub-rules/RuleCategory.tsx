import React from 'react';
import Rule, { RuleProps } from './Rule';

interface RuleCategoryProps {
  title: string;
  description: string;
  rules: RuleProps[];
}

const RuleCategory: React.FC<RuleCategoryProps> = ({ title, description, rules }) => {
  return (
    <>
      <h2 className="bold underline text-2xl">{title}</h2>
      <p className="italic">{description}</p>
      {rules.map((rule, index) => (
        <Rule key={index} {...rule} />
      ))}
      <hr />
    </>
  );
};

export default RuleCategory;
