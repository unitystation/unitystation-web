import Container from "../../components/ui/Container";
import SectionIntro from "../../components/ui/SectionIntro";

export default function AboutSection() {
    return (
        <Container width="wide" className="flex flex-col gap-20 py-20 sm:py-28">
            <SectionIntro
                kicker="What is Space Station 13?"
                title="Pick a job and keep the station running."
                lead="Every round drops a crew of real players onto a fully simulated space
                    station: power, atmospherics, chemistry and medicine all work (and break).
                    The crew is tasked to keep the station afloat, whilst among their midst are antagonists with nefarious objectives to sabotage the station.
                    Every shift provides a unique experience, with emergent gameplay and player-driven stories."
            />
            <SectionIntro
                kicker="Our Mission"
                title="Recreating the 2017 /TG/ experience."
                lead="We use 2017 /TG/ as our blueprint for this remake. 
                We aim to preserve the original experience, while improving the game with expanded content, modern features, and quality of life improvements. 
                Our goal is to make a faithful recreation of the classic Space Station 13 experience, while also making it more accessible and enjoyable for both veteran and new players."
            />
        </Container>
    );
}
