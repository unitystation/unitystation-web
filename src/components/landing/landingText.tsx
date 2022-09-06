import LandingButtons from './landingButtons';

type LandingTextProps = {
    mainText: string
    secondaryText: string
    lastText: string
}

const LandingText = (props: LandingTextProps) => {
    const {mainText, secondaryText, lastText} = props;

    return (
        <div className={'max-w-3xl mx-auto text-center'}>
            <h1 className={'text-3xl font-extrabold text-white sm:text-5xl'}>
                {mainText}
            </h1>
            <p className="mt-4 sm:leading-relaxed sm:text-xl">
                {secondaryText}
            </p>
            <p className={'mx-auto mt-4 font-extralight'}>
                {lastText}
            </p>
            <LandingButtons/>
        </div>)
}

export default LandingText;
