import { BlogPost } from "../../types/blogPost";
import { BlogPostsResponse } from "../../types/blogPostsResponse";
import FetchOfType from "../../utils/fetchOfType";
import Hero from "../../components/home/Hero";
import JobsTicker from "../../components/home/JobsTicker";
import AboutSection from "../../components/home/AboutSection";
import NewsSection from "../../components/home/NewsSection";
import CommunitySection from "../../components/home/CommunitySection";

const fetchLatestBlogPosts = async (): Promise<BlogPost[]> => {
    const revalidateConfig = { next: { revalidate: 60 } };
    try {
        const [page1, page2] = await Promise.all([
            FetchOfType<BlogPostsResponse>(
                "https://changelog.unitystation.org/posts/",
                revalidateConfig,
            ),
            FetchOfType<BlogPostsResponse>(
                "https://changelog.unitystation.org/posts/?page=2",
                revalidateConfig,
            ),
        ]);
        return page1.results.concat(page2.results);
    } catch {
        return [];
    }
};

const HomePage = async () => {
    const latestBlogPosts = await fetchLatestBlogPosts();

    return (
        <>
            <Hero />
            <JobsTicker />
            <AboutSection />
            <NewsSection posts={latestBlogPosts} />
            <CommunitySection />
        </>
    );
};

export default HomePage;
