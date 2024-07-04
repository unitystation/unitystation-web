// RulesSection.js
import React from 'react';
import RuleCategory from './RuleCategory';

const RulesSection = () => {
  const section1Rules = [
    {
      number: "1.1",
      text: "Do not harass, bully, brigade, defame, or doxx players, developers, or communities.",
      subRules: [
        "Sharing IPs or hardware IDs with other server hosts for the purpose of banning and moderation is allowed.",
        "Some guidance on what \"harassment\" constitutes: if somebody wants you to stop talking to or about them, you probably should."
      ]
    },
    {
      number: "1.2",
      text: "Do not attempt anything that is illegal in the European Union.",
      description: "In order to keep Unitystation as a project and global community safe, we follow EU laws and regulations. We expect you to comply with them as well regardless of where you live. Actions that are considered illegal may include, but are not limited to:",
      subRules: [
        "Hosting content or facilitating activities that promote discrimination, hostility, or violence against individuals or groups based on identity or individual characteristics such as gender, race, ethnicity, religion, or sexual orientation,",
        "Network attacks such as distributed denial of service or unauthorized access,",
        "Collecting data without user consent,",
        "Distribution of malware,",
        "Phishing and scams.",
      ],
      postNotes: [
        "If applicable, we may report you to government authorities.",
        "Security vulnerabilities can be reported to our security team by joining our Discord and pinging or talking to someone with the @Engineers or @Lead Developer role.",
        "Do not violate software licenses of other servers on the hub. This includes re-distributing the source code of secret repos or other license violations."
      ],
    },
    {
      number: "1.3",
      text: "Do not abuse the hardware or internet connection of players for purposes that are not directly related to playing the game or collecting telemetry, even with consent.",
      subRules: [
        "For example, do not mine cryptocurrency using the players' hardware.",
        "Redirecting the players' connection to another server you control or have permission to redirect to is allowed, as long as you have player consent."
      ]
    },
    {
      number: "1.4",
      text: "Servers containing mature elements such as erotic roleplay MUST clearly be marked as being 18+.",
      subRules: [
        "Do this by putting [18+] clearly in the server name and tags."
      ]
    },
    {
      number: "1.5",
      text: "If your server or community as a whole is 18+, you must do due diligence to remove underage players",
      subRules: [
        "You must ensure that minors do not have an easy way to access your community by using age verification methods that are suitable for your community and moderation capabilities.",
        "Upon learning that one of your community members is underage, you must remove them from your community immediately.",
        "If you do not have mature themes (rule 1.4) and choose to mark your server as 18+ anyways, you still cannot make exceptions here."
      ]
    },
    {
      number: "1.6",
      text: "Server staff members must not have a record of grooming or other predatory behavior.",
      subRules: [
        "This counts for all servers, not just exclusively 18+ servers."
      ]
    },
    {
      number: "1.7",
      text: "Do not send false information to the hub.",
      subRules: [
        "For example, do not lie about player count or about what region your server is in."
      ]
    },
    {
      number: "1.8",
      text: "Do not attempt to abuse loopholes in the hub rules or circumvent rulings",
      subRules: [
        "For example: trying to circumvent strikes by making a \"new\" community."
      ]
    }
  ];

  const section2Rules = [
    {
      number: "2.1",
      text: "Keep your server names and descriptions clean",
      subRules: [
        "They are visible to every player who uses the hub.",
        "Keep it safe for work and free from vulgarity.",
        "No bigotry, hate speech, discrimination, etc..."
      ]
    },
    {
      number: "2.2",
      text: "Do not impersonate other servers, developers, or organizations.",
      subRules: [
        "If there is a reasonable way for players to be confused about the affiliations of your server, you're probably breaking this."
      ]
    },
    {
      number: "2.3",
      text: "Don't intentionally cause any sort of technical trouble for other communities, servers, the hub, or players."
    }
  ];

  const section3Rules = [
    {
      number: "3.1",
      text: "No advertising in the server name.",
      description: "Server names are for describing a game, server, or community, and not for advertising unrelated services, causes, or other information. For Example:",
      subRules: [
        "A name consisting of only \"Hosted by XXX\" is not allowed, because it is advertising a hosting service.",
        "A name such as \"Foo Station | Now with new and improved X and Y | Running map Z\" is allowed, because it describes Foo Station.",
        "\"Advertisements\" as described in this rule are permitted in the server description (inside the foldout)."
      ]
    },
    {
      number: "3.2",
      text: "You may not use any of Unitystation's services to keep up with the downfall of a civilization.",
      description: "During the event a of a widespread viral infection transmitted via bites or contact with bodily fluids that causes human corpses to reanimate and seek to consume living human flesh, blood, brain or nerve tissue and is likely to result in the fall of organized civilization, You may not use any of Unitystation's services to spread updates or information about the event. Services include but are not limited to:",
      subRules: [
        "Stationhub",
        "The official discord server*",
      ],
      postNotes: [
        "*: The secret nsfw admin channel is exempt from this rule."
      ]
    }
  ];

  return (
    <section className="mb-8 flex flex-col gap-5">
      <h2 className="text-4xl font-bold mb-8 text-center">The Rules</h2>
      <RuleCategory 
        title="Section 1 (high severity)"
        description="These are the most important rules. Breaking one of them will lead to your community receiving up to three strikes at once. If you have a history of breaking these rules, that alone might be enough to disallow you from listing your server on the hub."
        rules={section1Rules}
      />
      <RuleCategory 
        title="Section 2 (medium severity)"
        description="Breaking one of these rules will lead to your community receiving at most one strike."
        rules={section2Rules}
      />
      <RuleCategory 
        title="Section 3 (low severity)"
        description="Breaking these rules will not lead your community to receiving any strikes, unless they are repeatedly broken or not resolved within a reasonable timeframe."
        rules={section3Rules}
      />
    </section>
  );
};

export default RulesSection;