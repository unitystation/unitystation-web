import React from 'react';
import PageLayout from './layout';
import RulesIntroduction from './RulesIntroduction';
import HowRulesApplied from './HowRulesApplied';
import RulesSection from './RulesSection';

const HubRules = () => {
  return (
    <PageLayout>
      <main className="flex flex-col items-center justify-center pt-8 px-4 mx-auto max-w-screen-xl">
        <div className="pt-8 pr-4 pl-4 format format-sm sm:format-base lg:format-lg format-invert bg-gray-900 bg-opacity-75">
            <h1 className="text-4xl font-bold mb-4 text-center">Stationhub Rules</h1>
          <RulesIntroduction />
          <HowRulesApplied />
          <RulesSection />
        </div>
      </main>
    </PageLayout>
  );
};

export default HubRules;