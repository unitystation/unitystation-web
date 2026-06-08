import LinkButton from '../common/uiLibrary/linkButton';
import { BiSolidDownload } from 'react-icons/bi';

const DownloadButtonClient = () => {
  return (
    <div className={'flex flex-col lg:flex-row justify-center mt-8 gap-4'}>
      <LinkButton className="shadow-2xl" filled={true} text={'Download'} linkTo={'/download'} iconRight={BiSolidDownload} />
    </div>
  );
};

export default DownloadButtonClient;
