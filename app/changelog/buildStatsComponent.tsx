import React from 'react';
import Build from '../../types/build';
import Panel from '../common/uiLibrary/panel';
import { FaArrowUp, FaWrench } from 'react-icons/fa';
import { FaCirclePlus } from "react-icons/fa6";
import Card from '../../components/mocules/Card';
import SmallNoteText from '../../components/mocules/SmallNoteText';

interface BuildStatsProps {
  builds: Build[];
}

const BuildStatsComponent: React.FC<BuildStatsProps> = ({ builds }) => {
  const recentBuilds = builds.slice(0, 150);
  
  const stats = recentBuilds.reduce((acc, build) => {
    build.changes.forEach(change => {
      switch (change.category) {
        case 'NEW':
          acc.additions++;
          break;
        case 'IMPROVEMENT':
          acc.improvements++;
          break;
        case 'FIX':
          acc.fixes++;
          break;
        default:
          break;
      }
    });
    return acc;
  }, { additions: 0, improvements: 0, fixes: 0 });

  return (
    <Panel>
      <h3 className="text-xl font-bold mb-4 text-white">Recent Build Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <FaCirclePlus className="text-green-500 text-2xl mr-3" />
          <div>
            <p className="text-gray-300 text-sm">Additions</p>
            <p className="text-white text-xl font-bold">{stats.additions}</p>
          </div>
        </Card>
        
        <Card>
          <FaArrowUp className="text-blue-600 text-2xl mr-3" />
          <div>
            <p className="text-gray-300 text-sm">Improvements</p>
            <p className="text-white text-xl font-bold">{stats.improvements}</p>
          </div>
        </Card>
        
        <Card>
          <FaWrench className="text-orange-600 text-2xl mr-3" />
          <div>
            <p className="text-gray-300 text-sm">Bug Fixes</p>
            <p className="text-white text-xl font-bold">{stats.fixes}</p>
          </div>
        </Card>
      </div>
      <SmallNoteText text={`Stats are based on the past ${recentBuilds.length} builds that were pushed onto our staging server from upstream.`} />
    </Panel>
  );
};

export default BuildStatsComponent; 