import { BsDiscord, BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiPatreonFill } from "react-icons/ri";
import { DISCORD_INVITE_URL, GITHUB_URL, PATREON_URL } from "../../utils/urlContants";

const CONTACT_EMAIL = "info@unitystation.org";

type ChannelProps = {
    href: string;
    icon: React.ReactNode;
    kicker: string;
    label: string;
};

function Channel({ href, icon, kicker, label }: ChannelProps) {
    return (
        <a
            href={href}
            className="group flex items-center gap-3 rounded-lg border border-seam bg-panel px-4 py-3 transition-colors hover:border-accent hover:bg-raised/70"
        >
            <span className="text-dim transition-colors group-hover:text-accent">{icon}</span>
            <span className="flex flex-col text-left leading-tight">
                <span className="type-label text-faint">{kicker}</span>
                <span className="text-sm font-semibold text-crew">{label}</span>
            </span>
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-seam bg-hull">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
                <div>
                    <h2 className="font-display text-3xl font-bold text-crew">Let&apos;s chat!</h2>
                    <p className="mt-3 max-w-md text-sm text-dim">
                        We&apos;d love to hear from you! The quickest way to reach us is by joining
                        our Discord server and dropping us a message. But, if you&apos;d rather,
                        feel free to shoot us an email.
                    </p>
                </div>

                <div className="grid content-center gap-3 sm:grid-cols-2">
                    <Channel
                        href={DISCORD_INVITE_URL}
                        icon={<BsDiscord className="h-6 w-6" aria-hidden />}
                        kicker="Join our"
                        label="Discord server"
                    />
                    <Channel
                        href={`mailto:${CONTACT_EMAIL}`}
                        icon={<MdEmail className="h-6 w-6" aria-hidden />}
                        kicker="Email us at"
                        label={CONTACT_EMAIL}
                    />
                    <Channel
                        href={GITHUB_URL}
                        icon={<BsGithub className="h-6 w-6" aria-hidden />}
                        kicker="Contribute on"
                        label="GitHub"
                    />
                    <Channel
                        href={PATREON_URL}
                        icon={<RiPatreonFill className="h-6 w-6" aria-hidden />}
                        kicker="Support us on"
                        label="Patreon"
                    />
                </div>
            </div>
        </footer>
    );
}
