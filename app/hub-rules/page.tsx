import FullPage from "../common/uiLibrary/Layouters/fullPage"

const HubRules = async () => {
    return (
        <FullPage>
            <main className={'flex flex-col ck-content items-center justify-center pt-8 px-4 mx-auto max-w-screen-xl '}>
                <div className="pt-8 pr-4 pl-4 format format-sm sm:format-base lg:format-lg format-invert bg-gray-900 bg-opacity-75">
                    <h1 className="text-4xl font-bold mb-4 text-center">Stationhub Rules</h1>
                    <p className="mb-4 text-center">This document specifies the rules that need to be followed when listing your community on our official server hub. If you are not sure whether something is allowed, or you think that something that is not allowed by the current rules should be allowed, feel free to contact us. We will clarify and possibly amend the rules.</p>
                    <p className="text-xs italic text-center">We may change these rules from time to time, for example to add clarifications. When we do, it will be announced on our discord server.</p>
                    <div className="pt-5">
                        <h1 className="text-4xl font-bold mb-8 text-center">How These Rules Are Applied</h1>
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Strike System</h2>
                            <p className="mb-4">
                                Breaking some rules will lead to your community receiving one or more <em>strikes</em>. Strikes expire a year after their cause or causes are resolved. If you have <strong>three or more active strikes</strong>, your community will be permanently removed from the hub.
                            </p>
                            <p className="mb-4">
                                You will be allowed to be relisted after enough strikes have expired to put you below three again. You must also have resolved the issue that caused the last strike. Contact us when this is the case, as we may not automatically relist you ourselves.
                            </p>
                        </section>
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
                                When deciding whether an issue is your community’s fault, we will look at factors such as:
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
                        <section className="mb-8 flex flex-col gap-5">
                            <h2 className="text-4xl font-bold mb-8 text-center">The Rules</h2>
                            <p className="bold underline text-2xl">Section 1 (high severity)</p>                       
                            <p className="italic">These are the most important rules. Breaking one of them will lead to your community receiving up to three strikes at once. If you have a history of breaking these rules, that alone might be enough to disallow you from listing your server on the hub.</p>    
                            <p>1.1 Do not harass, bully, brigade, defame, or doxx players, developers, or communities.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>Sharing IPs or hardware IDs with other server hosts for the purpose of banning and moderation is allowed.</li>
                                <li>Some guidance on what "harassment" constitutes: if somebody wants you to stop talking to or about them, you probably should.</li>
                            </ul>
                            <p>1.2 Do not attempt anything that is illegal in the European Union.</p>
                                <ul className="list-disc list-inside text-left pl-5">
                                    <li>In order to keep Unitystation as a project and global community safe, we follow EU laws and regulations. We expect you to comply with them as well regardless of where you live. Actions that are considered illegal may include, but are not limited to:
                                    <ul className="list-disc list-inside text-left pl-5">
                                        <li>Hosting content or facilitating activities that promote discrimination, hostility, or violence against individuals or groups based on identity or individual characteristics such as gender, race, ethnicity, religion, or sexual orientation,</li>
                                        <li>Network attacks such as distributed denial of service or unauthorized access,</li>
                                        <li>Collecting data without user consent,</li>
                                        <li>Distribution of malware,</li>
                                        <li>Phishing and scams.</li>
                                    </ul>
                                    </li>
                                    <li>If applicable, we may report you to government authorities.</li>
                                    <li>Security vulnerabilities can be reported to our security team by joining our Discord and pinging or talking to someone with the @Engineers or @Lead Developer role.</li>
                                    <li>Do not violate software licenses of other servers on the hub. This includes re-distributing the source code of secret repos or other license violations.</li>
                                </ul>
                                
                            <p>1.3 Do not abuse the hardware or internet connection of players for purposes that are not directly related to playing the game or collecting telemetry, even with consent.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>For example, do not mine cryptocurrency using the players` hardware.</li>
                                <li>Redirecting the players` connection to another server you control or have permission to redirect to is allowed, as long as you have player consent.</li>
                            </ul>
                                
                            <p>1.4 Servers containing mature elements such as erotic roleplay MUST clearly be marked as being 18+.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>Do this by putting [18+] clearly in the server name and tags.</li>
                            </ul>
                                
                            <p>1.5 If your server or community as a whole is 18+, you must do due diligence to remove underage players</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>You must ensure that minors do not have an easy way to access your community by using age verification methods that are suitable for your community and moderation capabilities.</li>
                                <li>Upon learning that one of your community members is underage, you must remove them from your community immediately.</li>
                                <li>If you do not have mature themes (rule 1.4) and choose to mark your server as 18+ anyways, you still cannot make exceptions here.</li>
                            </ul>
                                
                            <p>1.6 Server staff members must not have a record of grooming or other predatory behavior.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>This counts for all servers, not just exclusively 18+ servers.</li>
                            </ul>
                                
                            <p>1.7 Do not send false information to the hub.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>For example, do not lie about player count or about what region your server is in.</li>
                            </ul>
                            <p>1.8 Do not attempt to abuse loopholes in the hub rules or circumvent rulings</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>For example: trying to circumvent strikes by making a "new" community.</li>
                            </ul>
                            <hr></hr>
                            <h2 className="bold underline text-2xl pt-4">Section 2 (medium severity)</h2>
                            <p className="italic">Breaking one of these rules will lead to your community receiving at most one strike.</p>     
                            <p>2.1. Keep your server names and descriptions clean</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>They are visible to every player who uses the hub.</li>
                                <li>Keep it safe for work and free from vulgarity.</li>
                                <li>No bigotry, hate speech, descrimination, etc...</li>
                            </ul>
                            <p>2.2. Do not impersonate other servers, developers, or organizations.</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>If there is a reasonable way for players to be confused about the affiliations of your server, you're probably breaking this.</li>
                            </ul>
                            <p>2.3. Don`t intentionally cause any sort of technical trouble for other communities, servers, the hub, or players.</p>  
                            <hr></hr> 
                            <h2 className="bold underline text-2xl pt-4" >Section 3 (low severity)</h2>
                            <p className="italic">Breaking these rules will not lead your community to receiving any strikes, unless they are repeatedly broken or not resolved within a reasonable timeframe.</p>
                            <p>3.1. No advertising in the server name.</p>
                            <p>Server names are for describing a game, server, or community, and <em>not</em> for advertising unrelated services, causes, or other information.</p>
                            <ul>
                                <li>For example:
                                <ul className="list-disc list-inside text-left pl-5">
                                    <li>A name consisting of only "Hosted by XXX" is not allowed, because it is advertising a hosting service.</li>
                                    <li>A name such as "Foo Station | Now with new and improved X and Y | Running map Z" is allowed, because it describes Foo Station.</li>
                                </ul>
                                </li>
                                <li>"Advertisements" as described in this rule <em>are</em> permitted in the server description (inside the foldout).</li>
                            </ul>
                            <p>3.2. You may not use any of Unitystation`s services to keep up with the downfall of a civilization.</p>
                            <p>During the event a of a widespread viral infection transmitted via bites or contact with bodily fluids that causes human corpses to reanimate and seek to consume living human flesh, blood, brain or nerve tissue and is likely to result in the fall of organized civilization, You may not use any of Unitystation`s services to spread updates or information about the event. Services include but are not limited to:</p>
                            <ul className="list-disc list-inside text-left pl-5">
                                <li>Stationhub</li>
                                <li>The official discord server*</li>
                            </ul>
                            <p className="italic text-sm">*: The secret nsfw admin channel is exempt from this rule.</p>
                        </section>
                    </div>
                </div>
            </main>
        </FullPage>
    )
}

export default HubRules;
