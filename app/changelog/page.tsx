import { Metadata } from "next";
import Container from "../../components/ui/Container";
import PageHeader from "../../components/ui/PageHeader";
import ChangelogFeed from "../../components/changelog/ChangelogFeed";

export const metadata: Metadata = {
    title: "Changelog · Unitystation",
    description: "Every build of Unitystation and every change that made it in.",
};

export default function ChangelogPage() {
    return (
        <Container className="pb-16">
            <PageHeader title="Changelog" />
            <ChangelogFeed />
        </Container>
    );
}
