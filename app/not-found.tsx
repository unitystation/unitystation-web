import Container from "../components/ui/Container";
import LinkButton from "../components/ui/LinkButton";

export default function NotFound() {
    return (
        <Container className="flex flex-col items-center py-24 text-center">
            <h1 className="font-display text-7xl font-bold leading-none text-crew sm:text-8xl">
                404
            </h1>
            <p className="mt-4 font-display text-xl text-dim">Page not found</p>
            <p className="mt-6 max-w-md text-dim">
                The page you are looking for does not exist or something is terribly wrong with the
                website.
            </p>
            <LinkButton href="/" className="mt-8">
                Back to home
            </LinkButton>
        </Container>
    );
}
