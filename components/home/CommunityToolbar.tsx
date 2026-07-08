import { FaDiscord, FaGithub, FaPatreon } from "react-icons/fa6";
import type { IconType } from "react-icons";
import ButtonGroup from "../ui/ButtonGroup";
import LinkButton from "../ui/LinkButton";
import { DISCORD_INVITE_URL, GITHUB_URL, PATREON_URL } from "../../utils/urlContants";

const COMMUNITY: { label: string; href: string; Icon: IconType }[] = [
    { label: "GitHub", href: GITHUB_URL, Icon: FaGithub },
    { label: "Discord", href: DISCORD_INVITE_URL, Icon: FaDiscord },
    { label: "Patreon", href: PATREON_URL, Icon: FaPatreon },
];

/** The community links as one steel segmented toolbar, clearly secondary to the CTA. */
export default function CommunityToolbar() {
    return (
        <ButtonGroup aria-label="Community links">
            {COMMUNITY.map(({ label, href, Icon }) => (
                <LinkButton key={label} href={href} external variant="secondary" iconLeft={Icon}>
                    {label}
                </LinkButton>
            ))}
        </ButtonGroup>
    );
}
