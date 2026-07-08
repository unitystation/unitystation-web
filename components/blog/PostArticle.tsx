import Badge from "../ui/Badge";
import { BlogPost } from "../../types/blogPost";
import { toAgoTime } from "../../utils/timeUtils";
import { postTypeLabel, postTypeTone } from "../../utils/postMeta";
import Section from "./PostSection";

export default function PostArticle({ post }: { post: BlogPost }) {
    const { title, author, date_created, type, sections } = post;

    return (
        <article className="rounded-lg border border-seam bg-panel shadow-panel">
            <div className="p-6 sm:p-10">
                <header>
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge tone={postTypeTone(type)}>{postTypeLabel(type)}</Badge>
                        <time
                            dateTime={date_created?.toString()}
                            title={date_created?.toString()}
                            className="type-label text-faint"
                        >
                            {toAgoTime(date_created)}
                        </time>
                    </div>
                    <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-crew sm:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-3 text-sm text-dim">by {author}</p>
                </header>

                {!!sections &&
                    sections.map((section, index) => (
                        <Section key={index} heading={section.heading} body={section.body} />
                    ))}
            </div>
        </article>
    );
}
