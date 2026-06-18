import React from 'react';
import Panel from '../common/uiLibrary/panel';
import { FaTag } from 'react-icons/fa';
import Card from '../../components/mocules/Card';
import SmallNoteText from '../../components/mocules/SmallNoteText';

interface ReleaseInfo {
  version: string;
  commitSha: string;
}

interface LatestReleaseComponentProps {
  releaseInfo: ReleaseInfo;
}

const LatestReleaseComponent: React.FC<LatestReleaseComponentProps> = ({ releaseInfo }) => {
  return (
    <Panel>
      <h3 className="text-xl font-bold mb-4 text-white">Latest Code-Scan Release</h3>
      <Card>
        <FaTag className="text-purple-500 text-2xl mr-3" />
        <div>
          <p className="text-white text-xl font-bold">{releaseInfo.version}</p>
          <p className="text-gray-300 text-sm">Commit: {releaseInfo.commitSha.substring(0, 7)}</p>
        </div>
      </Card>
      <SmallNoteText text="To keep our players safe, we only allow whitelisted code to be run on clients that are scanned and opened via stationhub." />
    </Panel>
  );
};

export default LatestReleaseComponent; 