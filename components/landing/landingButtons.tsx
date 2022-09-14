import Button from '../button';
import getDownloadLink from '../../lib/platform';
const githubUrl = 'https://github.com/unitystation/unitystation';
const discordInviteUrl = 'https://discord.com/invite/tFcTpBp';
const githubReleases = 'https://github.com/unitystation/stationhub/releases/latest';

import {useEffect, useState} from 'react';



const LandingButtons = () => {
    const [downloadLink, setDownloadLink] = useState(githubReleases);

    useEffect(() => {
        getDownloadLink().then((link) => setDownloadLink(link));
    }, []);

    return (<div className={'flex flex-wrap justify-center mt-8 gap-4'}>
            <Button filled={true} text={'Download'} linkTo={downloadLink}/>
            <Button filled={false} text={'Github'} linkTo={githubUrl}/>
            <Button filled={false} text={'Discord'} linkTo={discordInviteUrl}/>
        </div>)
}

export default LandingButtons;
