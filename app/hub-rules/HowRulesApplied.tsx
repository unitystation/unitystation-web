import React from 'react';
import StrikeSystem from './StrikeSystem';
import ScopeOfRules from './ScopeOfRules';
import EnforcementProcedure from './EnforcementProcedure';

const HowRulesApplied = () => {
  return (
    <div className="pt-5">
      <h1 className="text-4xl font-bold mb-8 text-center">How These Rules Are Applied</h1>
      <StrikeSystem />
      <ScopeOfRules />
      <EnforcementProcedure />
    </div>
  );
};

export default HowRulesApplied;