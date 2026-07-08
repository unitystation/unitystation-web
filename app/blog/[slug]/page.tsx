import { Metadata } from "next";
import Container from "../../../components/ui/Container";
import { BlogPost } from "../../../types/blogPost";
import { PageParams } from "../../../types/pageParams";
import FetchOfType from "../../../utils/fetchOfType";
import "../ck-content.css";
import PostArticle from "../../../components/blog/PostArticle";

const fetchPost = async (slug: string): Promise<BlogPost> => {
    return FetchOfType<BlogPost>(`https://changelog.unitystation.org/posts/${slug}`, {
        next: { revalidate: 60 },
    });
};

export async function generateMetadata(query: PageParams): Promise<Metadata> {
    const { slug } = await query.params;
    const post = await fetchPost(slug);

    return {
        title: `Unitystation - ${post.title}`,
        description: post.summary,
        openGraph: {
            type: "website",
            locale: "en_US",
            url: `https://unitystation.org/blog/${post.slug}`,
            title: `Unitystation - ${post.title}`,
            description: post.summary,
            images: [{ url: post.socials_image }],
        },
    };
}

export default async function PostPage(query: PageParams) {
    const { slug } = await query.params;
    const post = await fetchPost(slug);

    return (
        <Container className="py-10 lg:py-16">
            <PostArticle post={post} />
        </Container>
    );
}
