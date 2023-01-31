import {NextPage} from 'next';
import FlexPageContainer from '../components/layout/prefabs/flexPageContainer';
import FluidMainContainer from '../components/layout/prefabs/fixedFluidFixed/fluidMainContainer';
import ChangelogResultsPage from '../components/changelog/changelogResultsPage';
import {AllChangesResponse} from '../types/allChangesResponse';
import {useEffect, useState} from 'react';
import Head from "next/head";



const initialResponse: AllChangesResponse = {
    count: 0,
    next: null,
    previous: null,
    results: []
}


const Changelog: NextPage = () => {
    const [changelog, setChangelog] = useState<AllChangesResponse>(initialResponse);
    const [url, setUrl] = useState<string | null>('https://changelog.unitystation.org/all-changes?limit=3');

    useEffect(() => {
        if (url == null) return;
        window.scrollTo(0, 0)
        fetch(url).
            then(response => response.json()).
            then((data: AllChangesResponse) => {
                setChangelog(data);
                console.log(data);
        })
    }, [url]);

    const handleNextClicked = () => {
        console.log('next clicked');
        setUrl(changelog.next);
    }

    const handlePrevClicked = () => {
        console.log('prev clicked');
        setUrl(changelog.previous);
    }

    return (
        <>
            <Head>
                <title key="title">Unitystation - Changelog</title>
                <meta
                    key="description"
                    name="description"
                    content="Find all the changes we have pushed to Unitystation here!"/>
                <meta key="og:title" property="og:title" content="Unitystation - Changelog"/>
                <meta
                    key="og:description"
                    property="og:description"
                    content="Find all the changes we have pushed to Unitystation here!"/>
                <meta key="og:url" property="og:url" content="https://unitystation.org/changelog"/>
            </Head>
            <FlexPageContainer>
                <FluidMainContainer>
                    <div className={'w-full flex flex-col items-center justify-center'}>
                        <h1 className={'text-3xl font-bold text-center'}>Changelog</h1>
                        <br/>
                        <br/>

                        <ChangelogResultsPage
                            count={changelog.count}
                            next={changelog.next}
                            previous={changelog.previous}
                            results={changelog.results}
                            handleNextClicked={handleNextClicked}
                            handlePrevClicked={handlePrevClicked}/>
                    </div>
                </FluidMainContainer>
            </FlexPageContainer>
        </>
    )
}

export default Changelog;
