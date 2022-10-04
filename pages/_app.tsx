import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Background from '../components/background';
import Container from '../components/layout/container';
import Navigation from '../components/navigation';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Background>
                <Container>
                    <Navigation/>
                    <Component {...pageProps} />
                </Container>
            </Background>
        </>
    )
}

export default MyApp
