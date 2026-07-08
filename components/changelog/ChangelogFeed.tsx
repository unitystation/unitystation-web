"use client";

import useInfiniteFeed from "../../hooks/useInfiniteFeed";
import LoadingPanel from "../ui/LoadingPanel";
import Build from "../../types/build";
import BuildPanel from "./BuildPanel";

const INITIAL_PAGE = "https://changelog.unitystation.org/all-changes?limit=5";

/** Infinite-scrolling list of game builds and their changes. */
export default function ChangelogFeed() {
    const { items: builds, isLoading, sentinelRef } = useInfiniteFeed<Build>(INITIAL_PAGE);

    return (
        <div className="flex flex-col gap-4">
            {builds.map((build, index) => (
                <BuildPanel key={index} build={build} />
            ))}
            {isLoading && <LoadingPanel label="Fetching builds" />}
            <div ref={sentinelRef} aria-hidden />
        </div>
    );
}
