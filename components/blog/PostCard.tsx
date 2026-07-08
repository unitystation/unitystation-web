import classNames from "classnames";
import Badge from "../../components/ui/Badge";
import CardLink from "../../components/ui/CardLink";
import { BlogPost } from "../../types/blogPost";
import { toAgoTime, toHumanTime } from "../../utils/timeUtils";
import { postTypeLabel, postTypeTone } from "../../utils/postMeta";

/** Cover image with scanlines and the type stamp. Shared with the home
 *  news section's featured card. The image is absolutely positioned so the
 *  box is sized by the caller (aspect ratio, min-height or grid stretch),
 *  never by the image's intrinsic size. */
export function PostMedia({ post, className }: { post: BlogPost; className?: string }) {
    return (
        <div className={classNames("relative overflow-hidden bg-hull", className)}>
            {/* oxlint-disable-next-line nextjs/no-img-element */}
            <img
                src={post.socials_image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]"
            />
            <div className="scanlines absolute inset-0" aria-hidden />
            <Badge tone={postTypeTone(post.type)} className="absolute left-3 top-3 bg-void/80">
                {postTypeLabel(post.type)}
            </Badge>
        </div>
    );
}

/** "3 days ago · by Author" metadata line. */
export function PostMeta({ post }: { post: BlogPost }) {
    return (
        <p className="type-label text-faint">
            <time
                dateTime={new Date(post.date_created).toISOString()}
                title={toHumanTime(post.date_created)}
            >
                {toAgoTime(post.date_created)}
            </time>{" "}
            · by {post.author}
        </p>
    );
}

type Props = {
    post: BlogPost;
    /** Heading element for the title, so the card slots into any page's
     *  heading hierarchy (h2 on /blog under the page h1; h3 on the home
     *  page under the "Latest news" h2). */
    titleAs?: "h2" | "h3";
};

/** Feed card: cover image, type stamp, title, summary. */
export default function PostCard({ post, titleAs: Title = "h2" }: Props) {
    return (
        <CardLink href={`/blog/${post.slug}`} className="flex flex-col">
            <PostMedia post={post} className="aspect-[2/1]" />
            <div className="flex flex-1 flex-col p-5">
                <PostMeta post={post} />
                <Title className="mt-2 font-display text-xl font-bold leading-tight text-crew transition-colors group-hover:text-accent">
                    {post.title}
                </Title>
                <p className="mt-2 line-clamp-3 text-sm text-dim">{post.summary}</p>
            </div>
        </CardLink>
    );
}
