import React from 'react';

const StrikeSystem = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Strike System</h2>
      <p className="mb-4">
        Breaking some rules will lead to your community receiving one or more <em>strikes</em>. Strikes expire a year after their cause or causes are resolved. If you have <strong>three or more active strikes</strong>, your community will be permanently removed from the hub.
      </p>
      <p className="mb-4">
        You will be allowed to be relisted after enough strikes have expired to put you below three again. You must also have resolved the issue that caused the last strike. Contact us when this is the case, as we may not automatically relist you ourselves.
      </p>
    </section>
  );
};

export default StrikeSystem;
