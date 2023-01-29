import {BlogPost} from "./blogPost";

export interface BlogPostsResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: BlogPost[],
}
