import { useCallback, useEffect, useRef, useState } from "react";

/** The changelog API's pagination envelope: one page of results plus the next page's URL. */
type FeedPage<T> = { results: T[]; next: string | null };

/**
 * Pages through a paginated JSON feed for an infinite-scrolling list: loads
 * the first page on mount, then the next page whenever the returned sentinel
 * element scrolls within reach. Render the sentinel (an empty div is fine)
 * below the list.
 */
export default function useInfiniteFeed<T>(initialUrl: string) {
    const [items, setItems] = useState<T[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(initialUrl);
    const [isLoading, setIsLoading] = useState(true);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);

    const loadMore = useCallback(async (url: string) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setIsLoading(true);
        try {
            const response = await fetch(url);
            const page = (await response.json()) as FeedPage<T>;
            setItems((prev) => [...prev, ...page.results]);
            setNextPage(page.next);
        } finally {
            loadingRef.current = false;
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadMore(initialUrl);
    }, [initialUrl, loadMore]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !nextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) void loadMore(nextPage);
            },
            { rootMargin: "400px" },
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [nextPage, loadMore]);

    return { items, isLoading, sentinelRef };
}
