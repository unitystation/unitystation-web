import Container from "../../components/ui/Container";
import LoadingPanel from "../../components/ui/LoadingPanel";

export default function ChangelogLoading() {
    return (
        <Container className="py-16">
            <LoadingPanel label="Fetching builds" />
        </Container>
    );
}
