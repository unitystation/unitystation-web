"use client";

import useInfiniteFeed from "../../hooks/useInfiniteFeed";
import LoadingPanel from "../ui/LoadingPanel";
import { BlogPost } from "../../types/blogPost";
import PostCard from "./PostCard";

const INITIAL_PAGE = "https://changelog.unitystation.org/posts/?page=1";

/** Infinite-scrolling feed of every published post. */
export default function BlogFeed() {
    const { items: posts, isLoading, sentinelRef } = useInfiniteFeed<BlogPost>(INITIAL_PAGE);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
            {isLoading && <LoadingPanel label="Fetching posts" />}
            <div ref={sentinelRef} aria-hidden />
        </div>
    );
}
