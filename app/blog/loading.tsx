import Container from "../../components/ui/Container";
import LoadingPanel from "../../components/ui/LoadingPanel";

export default function BlogLoading() {
    return (
        <Container width="wide" className="py-16">
            <LoadingPanel label="Fetching posts" />
        </Container>
    );
}
