import '../styles/globals.css'
import '../styles/ck-content.css'
import type {AppProps} from 'next/app'
import Background from '../components/background';
import Container from '../components/layout/container';
import Navigation from '../components/navigation';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/clown.css'
import Clown from "../components/clown/clown";
import Head from "next/head";
config.autoAddCss = false

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="keywords" content="unitystation, Space Station 13, SS13, Unity, RPG, Among us" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title key='title'>Unitystation</title>
                <meta
                    key='description'
                    name="description"
                    content="Unitystation is a free and open-source multiplayer space station 13 remake built in Unity."
                />
                <meta
                    key='og:title'
                    property="og:title"
                    content="Unitystation - The Space Station 13 Remake made in Unity"
                />
                <meta
                    key='og:description'
                    property="og:description"
                    content="Unitystation is a free and open-source multiplayer space station 13 remake built in Unity."
                />
                <meta
                    key='og:image'
                    property="og:image"
                    content="https://unitystationfile.b-cdn.net/Branding/headerCapsule.png"
                />
                <meta key="og:type" property="og:type" content="website"/>
            </Head>
            <Background>
                <Clown></Clown>
                <Container>
                    <Navigation/>
                    <Component {...pageProps} />
                </Container>
            </Background>
        </>
    )
}

export default MyApp
