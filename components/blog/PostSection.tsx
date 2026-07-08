import { BlogPostSection } from "../../types/blogPost";

/* Posts come from the CMS with raw CKEditor HTML; YouTube embeds arrive as
 * <oembed> tags that browsers ignore, so rewrite them into iframes. */
const handleOembed = (heading: string, body: string): string => {
    const pattern =
        /<oembed url="https?:\/\/(?:www.youtube.com\/watch\?v=|youtu.be\/)([\w-]+)"><\/oembed>/g;
    return body.replace(
        pattern,
        (_match: string, videoId: string) => `
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${videoId}"
                title="${heading}"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>
      </div>
    `,
    );
};

export default function Section({ heading, body }: BlogPostSection) {
    return (
        <section className="mt-10">
            {heading && (
                <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-crew">
                    {heading}
                </h2>
            )}
            <div
                className="ck-content text-dim"
                dangerouslySetInnerHTML={{ __html: handleOembed(heading ?? "", body) }}
            />
        </section>
    );
}
