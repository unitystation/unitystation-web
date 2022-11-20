import {NextPage} from 'next';
import LandingText from '../components/landing/landingText';
import Section from '../components/layout/section';
import LandingButtons from '../components/landing/landingButtons';

const Index: NextPage = () => {
    return (
        <>
            <Section>
                <div className={"h-screen"}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <LandingText
                        mainText={'Welcome to Unitystation!'}
                        secondaryText={'Free and open-source remake of the cult classic Space Station 13, made in Unity Engine.'}
                        lastText={'Our website is currently in the middle of a make-over. Expect a lot of cool things soon!'}/>
                    <LandingButtons/>
                </div>
            </Section>
        </>
    )
};

export default Index;
