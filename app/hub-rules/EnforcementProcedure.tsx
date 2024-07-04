import React from 'react';

const EnforcementProcedure = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Enforcement Procedure</h2>
      <p className="mb-4">
        Depending on the scope and nature of the violation in question we will try to contact you privately and resolve things cleanly without a lasting strike. This depends on the kind offense in question and how cooperative you were to resolve the matter.
      </p>
      <p className="mb-4">
        If we do decide to hand out a strike, we expect you to resolve the problem within a reasonable timeframe. Failing this we may delist your server until the root problem is solved, regardless of total strikes remaining.
      </p>
      <p className="mb-4">
        We expect to be able to contact you about matters of the hub rules. You should have some form of contact information on your server: something as simple as a Discord or website link we can follow as a paper trail is good enough. If we are unable to contact you we may be forced to go immediately to delisting.
      </p>
    </section>
  );
};

export default EnforcementProcedure;
