"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import Badge from "../../components/ui/Badge";
import CopyCommand from "../../components/ui/CopyCommand";
import LinkButton from "../../components/ui/LinkButton";
import Notice from "../../components/ui/Notice";
import Panel from "../../components/ui/Panel";
import TextLink from "../../components/ui/TextLink";
import { DownloadVariant, LauncherRelease, OsKey } from "../../types/launcherRelease";
import { detectPlatform, LinuxFamily, recommendedLinuxFormat } from "../../utils/detectPlatform";
import { OS_META, OS_ORDER } from "../../utils/osMeta";

type Props = {
    release: LauncherRelease | null;
    fallbackUrl: string;
    initialOs?: OsKey; // server-detected platform; the client re-detects only when omitted
    initialLinuxFamily?: LinuxFamily;
};

function OsTabs({
    selected,
    detected,
    onSelect,
}: {
    selected: OsKey;
    detected: OsKey | null;
    onSelect: (os: OsKey) => void;
}) {
    return (
        <div
            role="tablist"
            aria-label="Operating system"
            className="flex border-b border-seam bg-hull"
        >
            {OS_ORDER.map((os) => {
                const { label, Icon } = OS_META[os];
                const active = os === selected;
                return (
                    <button
                        key={os}
                        role="tab"
                        aria-selected={active}
                        onClick={() => onSelect(os)}
                        className={classNames(
                            "flex flex-1 items-center justify-center gap-2 px-4 py-3 font-display text-sm font-semibold uppercase tracking-label transition-colors",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                            active
                                ? "border-b-2 border-accent bg-primary/15 text-accent"
                                : "text-dim hover:bg-raised hover:text-crew",
                        )}
                    >
                        <Icon className="h-4 w-4" aria-hidden />
                        <span>{label}</span>
                        {os === detected && <Badge tone="info">Detected</Badge>}
                    </button>
                );
            })}
        </div>
    );
}

function HeroDownload({ variant }: { variant: DownloadVariant }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <LinkButton href={variant.url} size="lg" iconRight={BiSolidDownload}>
                {variant.label}
            </LinkButton>
            <p className="type-label text-faint">{variant.sizeMB} MB</p>
        </div>
    );
}

function PackageRow({
    recommended,
    href,
    children,
}: {
    recommended?: boolean;
    href?: string;
    children: React.ReactNode;
}) {
    const base =
        "relative flex w-full flex-col items-center gap-2 rounded-lg border px-4 py-3 text-sm text-crew transition-colors";
    const border = recommended ? "border-accent/60 bg-primary/10" : "border-seam bg-hull/60";
    const badge = recommended && (
        <Badge tone="primary" className="absolute -top-2.5 right-3 bg-hull">
            Recommended
        </Badge>
    );

    if (href) {
        return (
            <a
                href={href}
                className={classNames(base, border, "hover:border-accent hover:bg-raised/60")}
            >
                {children}
                {badge}
            </a>
        );
    }

    return (
        <div className={classNames(base, border)}>
            {children}
            {badge}
        </div>
    );
}

function Variants({
    os,
    release,
    linuxRecommended,
}: {
    os: OsKey;
    release: LauncherRelease;
    linuxRecommended?: "aur" | "deb" | "rpm";
}) {
    if (os === "win") {
        const { recommended, alternatives } = release.platforms.windows;
        return (
            <div className="flex flex-col items-center gap-5">
                {recommended && <HeroDownload variant={recommended} />}
                {alternatives.map((v) => (
                    <TextLink key={v.url} href={v.url} className="text-sm">
                        {v.label} · {v.sizeMB} MB
                    </TextLink>
                ))}
            </div>
        );
    }

    if (os === "mac") {
        const { recommended, note } = release.platforms.mac;
        return (
            <div className="flex flex-col items-center gap-5">
                {recommended && <HeroDownload variant={recommended} />}
                <p className="max-w-sm text-center text-xs text-warning">{note}</p>
            </div>
        );
    }

    const { deb, rpm, aur } = release.platforms.linux;
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
            <p className="type-label text-faint">Choose your package</p>

            {deb && (
                <PackageRow href={deb.url} recommended={linuxRecommended === "deb"}>
                    <span>
                        {deb.label} · {deb.sizeMB} MB
                    </span>
                </PackageRow>
            )}

            {rpm && (
                <PackageRow href={rpm.url} recommended={linuxRecommended === "rpm"}>
                    <span>
                        {rpm.label} · {rpm.sizeMB} MB
                    </span>
                </PackageRow>
            )}

            <PackageRow recommended={linuxRecommended === "aur"}>
                <span>Arch Linux (AUR)</span>
                <CopyCommand command={aur.cmd} />
                <TextLink href={aur.pageUrl} external className="text-xs">
                    View on AUR
                </TextLink>
            </PackageRow>
        </div>
    );
}

export default function DownloadExperience({
    release,
    fallbackUrl,
    initialOs,
    initialLinuxFamily,
}: Props) {
    const [selectedOs, setSelectedOs] = useState<OsKey>(initialOs ?? "win");
    const [linuxFamily, setLinuxFamily] = useState<LinuxFamily | undefined>(initialLinuxFamily);
    const [detected, setDetected] = useState<OsKey | null>(initialOs ?? null);

    // Platform detection needs `navigator`, so it must run after hydration; the
    // setState-in-effect is deliberate (SSR markup must match the first render).
    /* oxlint-disable react/react-compiler */
    useEffect(() => {
        if (initialOs) return;
        const info = detectPlatform();
        if (info.os !== "unknown") {
            setSelectedOs(info.os);
            setDetected(info.os);
        }
        setLinuxFamily(info.linuxFamily);
    }, [initialOs]);
    /* oxlint-enable react/react-compiler */

    if (!release) {
        return (
            <div className="mx-auto flex max-w-md flex-col items-center gap-5">
                <Notice tone="warning" className="w-full">
                    <p>
                        We couldn&apos;t fetch the latest release. You can get it directly from
                        GitHub instead.
                    </p>
                </Notice>
                <LinkButton href={fallbackUrl} external size="lg" iconRight={BiSolidDownload}>
                    All downloads on GitHub
                </LinkButton>
            </div>
        );
    }

    return (
        <Panel
            title={`Pudu Launcher - ${release.version}`}
            led
            meta={
                <TextLink href={release.releasesPageUrl} external className="text-xs normal-case">
                    Release notes
                </TextLink>
            }
            flush
            className="mx-auto w-full max-w-2xl"
        >
            <OsTabs selected={selectedOs} detected={detected} onSelect={setSelectedOs} />
            <div className="px-6 py-10">
                <Variants
                    os={selectedOs}
                    release={release}
                    linuxRecommended={recommendedLinuxFormat(linuxFamily)}
                />
            </div>
        </Panel>
    );
}
