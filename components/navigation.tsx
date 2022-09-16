import StyledLink from './styledLink';
import ExternalLink from './landing/externalLink';

const playerWiki = 'https://wiki.unitystation.org'
const devWiki = 'https://unitystation.github.io/unitystation/'

const Navigation = () => {
    return (
        <nav className="flex items-center justify-between max-w-3xl p-4 mx-auto">
            <ul className="flex items-center text-sm font-medium text-gray-500 space-x-2">
                <li>
                    <StyledLink href="/" className="px-3 py-2 rounded-lg"> Home </StyledLink>
                </li>

                <li>
                    <StyledLink href="/changelog" className="px-3 py-2 rounded-lg">Changelog</StyledLink>
                </li>

                <li>
                    <ExternalLink href={playerWiki} text="Player's Wiki" />
                </li>
                <li>
                    <ExternalLink href={devWiki} text="Developer's Wiki" />
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
