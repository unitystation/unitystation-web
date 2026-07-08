import { BiSolidDownload } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa6";
import Container from "../../components/ui/Container";
import LinkButton from "../../components/ui/LinkButton";
import SectionIntro from "../../components/ui/SectionIntro";
import { DISCORD_INVITE_URL } from "../../utils/urlContants";

export default function CommunitySection() {
    return (
        <Container className="pb-24 pt-6 sm:pb-32">
            <div className="flex flex-col items-center text-center">
                <SectionIntro
                    centered
                    kicker="Every Saturday"
                    title="Join the community playtest!"
                    lead="Once a week the community meets on the official server to play the latest
                        build. Times and server info are announced on Discord."
                />
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <LinkButton
                        href={DISCORD_INVITE_URL}
                        external
                        variant="primary"
                        size="lg"
                        iconLeft={FaDiscord}
                    >
                        Join the Discord
                    </LinkButton>
                    <LinkButton
                        href="/download"
                        variant="secondary"
                        size="lg"
                        iconLeft={BiSolidDownload}
                    >
                        Get the game
                    </LinkButton>
                </div>
            </div>
        </Container>
    );
}
