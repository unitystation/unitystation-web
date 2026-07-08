import Container from "../../components/ui/Container";
import SectionIntro from "../../components/ui/SectionIntro";

export default function AboutSection() {
    return (
        <Container width="wide" className="py-20 sm:py-28">
            <SectionIntro
                kicker="What is Unitystation?"
                title="Pick a job and keep the station running."
                lead="Every round drops a crew of real players onto a fully simulated space
                    station: power, atmospherics, chemistry and medicine all work (and break).
                    Whether the shift ends in a calm crew transfer or a reactor fire depends
                    entirely on the people aboard."
            />
        </Container>
    );
}
