import { BlogPost } from "../../types/blogPost";
import CardLink from "../../components/ui/CardLink";
import Container from "../../components/ui/Container";
import LinkButton from "../../components/ui/LinkButton";
import SectionIntro from "../../components/ui/SectionIntro";
import PostCard, { PostMedia, PostMeta } from "../blog/PostCard";

/* The featured card has room for real prose, so show the post's opening
 * text instead of the one-line summary. Bodies are raw CKEditor HTML
 * (see PostSection), so strip tags and decode the common entities; the
 * CSS line clamp does the trimming. */
function postExcerpt(post: BlogPost): string {
    const text = (post.sections ?? [])
        .map((section) => section.body)
        .join(" ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .replace(/ ([.,!?;:])/g, "$1")
        .trim();
    return text || post.summary;
}

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <CardLink
            href={`/blog/${post.slug}`}
            className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        >
            <PostMedia post={post} className="aspect-[2/1] lg:aspect-auto lg:min-h-[20rem]" />
            <div className="flex flex-col p-6 sm:p-8">
                <PostMeta post={post} />
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-crew transition-colors group-hover:text-accent sm:text-3xl">
                    {post.title}
                </h3>
                <p className="mt-4 line-clamp-5 text-base text-dim lg:line-clamp-[10]">
                    {postExcerpt(post)}
                </p>
            </div>
        </CardLink>
    );
}

export default function NewsSection({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

    const [featured, ...rest] = posts;
    const gridCount = rest.length < 3 ? rest.length : Math.min(6, Math.floor(rest.length / 3) * 3);

    return (
        <Container width="wide" className="py-16 sm:py-20">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <SectionIntro size="md" kicker="From the blog" title="Latest news" />
                <LinkButton href="/blog" variant="secondary" size="sm">
                    All posts
                </LinkButton>
            </div>

            <FeaturedPost post={featured} />

            {gridCount > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.slice(0, gridCount).map((post) => (
                        <PostCard key={post.slug} post={post} titleAs="h3" />
                    ))}
                </div>
            )}
        </Container>
    );
}
