import {NextPage} from 'next';
import Background from '../components/background';
import LandingText from '../components/landing/landingText';
import Section from '../components/section';

const Index: NextPage = () => {
    return (
        <>
            <Background>
                <Section>
                        <LandingText
                            mainText={'Welcome to Unitystation!'}
                            secondaryText={'Free and open-source remake of the cult classic Space Station 13, made in Unity Engine.'}
                            lastText={'Our website is currently in the middle of a make-over. Expect a lot of cool things soon!'}/>
                </Section>
            </Background>
        </>
    )
};

export default Index;
