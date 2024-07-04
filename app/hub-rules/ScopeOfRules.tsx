import React from 'react';

const ScopeOfRules = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Scope of Rules</h2>
      <p className="mb-4">
        These rules apply to any communities that have at least one server listed on the server hub. Our jurisdiction is as far as to remove your server(s) from the hub, and nothing more. 
      </p>
      <p className="mb-4">
        We expect you to enforce some of these rules in other places than simply on-hub game servers. For example, 18+ rules may need to be enforced in your Discord or on any off-hub servers you have.
      </p>
      <p className="mb-4">
        We draw the line at what encapsulates a <em>“community”</em> on a case-by-case basis. This is based on shared branding, community spaces (e.g., Discord), infrastructure, and staff. For example, if you are a host that merely provides infrastructure for another community, you will get some degree of separation from said community. However, severe enough offenses may still make us come to you.
      </p>
      <p className="mb-4">
        When deciding whether an issue is your community's fault, we will look at factors such as:
      </p>
      <ul className="list-disc list-inside mb-4 text-left pl-5">
        <li>The status of the perpetrators in your community</li>
        <li>The severity of the issue</li>
        <li>Whether your community facilitates the issue or punished people for it</li>
      </ul>
      <p className="mb-4">Some examples:</p>
      <ul className="list-disc list-inside text-left pl-5">
        <li>Not accountable: a random player trash-talking another server after being banned there.</li>
        <li>Accountable: a staff member perpetuating lies about another server to the point it becomes an issue for them.</li>
        <li>Accountable: harassment perpetuated by a large group of members, with staff aware but letting it happen.</li>
      </ul>
    </section>
  );
};

export default ScopeOfRules;
