import Button from '../button';

const downloadLink = 'https://github.com/unitystation/stationhub/releases';
const githubUrl = 'https://github.com/unitystation/unitystation';
const discordInviteUrl = 'https://discord.com/invite/tFcTpBp';

const LandingButtons = () => {
    return (<div className={'flex flex-wrap justify-center mt-8 gap-4'}>
            <Button filled={true} text={'Download'} linkTo={downloadLink}/>
            <Button filled={false} text={'Github'} linkTo={githubUrl}/>
            <Button filled={false} text={'Discord'} linkTo={discordInviteUrl}/>
        </div>)
}

export default LandingButtons;
