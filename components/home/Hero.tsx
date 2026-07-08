import { BiSolidDownload } from "react-icons/bi";
import LinkButton from "../ui/LinkButton";
import CommunityToolbar from "./CommunityToolbar";
import RotatingTagline from "./RotatingTagline";
import ScreenshotFeed from "./ScreenshotFeed";

export default function Hero() {
    return (
        <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-[88rem] flex-col justify-center px-4 pb-14 pt-20 sm:px-6 lg:py-16">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:grid-cols-[minmax(0,10fr)_minmax(0,11fr)] xl:gap-14">
                {/* Title column */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="relative animate-fade-up">
                        <h1 className="text-halo-lg font-display font-bold tracking-tight text-crew">
                            <span className="block text-2xl font-semibold text-dim sm:text-3xl">
                                Welcome to
                            </span>
                            <span className="mt-1 block text-4xl leading-none min-[420px]:text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                                Unitystation!
                            </span>
                        </h1>
                        <RotatingTagline />
                    </div>

                    <p className="text-halo-md mt-6 max-w-xl animate-fade-up text-lg text-dim [animation-delay:120ms] sm:text-xl">
                        Free and open-source remake of the cult classic Space Station 13, made in
                        Unity Engine.
                    </p>

                    <div className="mt-10 flex animate-fade-up flex-col items-stretch gap-4 [animation-delay:240ms]">
                        <LinkButton
                            href="/download"
                            size="lg"
                            iconRight={BiSolidDownload}
                            className="shadow-cta"
                        >
                            Download
                        </LinkButton>
                        <CommunityToolbar />
                    </div>
                </div>

                {/* screenshot feed */}
                <div className="relative w-full animate-fade-up [animation-delay:360ms] lg:-mr-6 lg:w-auto">
                    <ScreenshotFeed />
                </div>
            </div>
        </section>
    );
}
