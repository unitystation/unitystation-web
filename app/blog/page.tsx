import { Metadata } from "next";
import Container from "../../components/ui/Container";
import PageHeader from "../../components/ui/PageHeader";
import BlogFeed from "../../components/blog/BlogFeed";

export const metadata: Metadata = {
    title: "Blog · Unitystation",
    description: "News, progress updates and community highlights from the Unitystation crew.",
};

export default function BlogPage() {
    return (
        <Container width="wide" className="pb-16">
            <PageHeader title="Blog" />
            <BlogFeed />
        </Container>
    );
}
