import ChangeComponent from './ChangeComponent';
import {Card} from 'flowbite-react';
import Change from '../../types/change';
import Build from '../../types/build';


const BuildComponent = (props: Build) => {
    const {version_number, date_created, changes} = props;
    let changesList;

    if (changes.length > 0) {
        changesList = changes.map((change: Change, index: number) => {
            return (
            <ChangeComponent
                key={index}
                author_username={change.author_username}
                author_url={change.author_url}
                description={change.description}
                pr_url={change.pr_url}
                pr_number={change.pr_number}
                category={change.category}
                build={version_number}
                date_added={date_created}/>)
        })
    } else {
        changesList =
            <li className={'py-3 sm:py-4'}>
                <div className={'flex items-center space-x-4'}>
                    <div className={'shrink-0'}>
                        
                    </div>
                    <div className={'min-w-fit flex-1'}>
                        <p className={'text-center text-gray-500'}>This build has no registered changes :(</p>
                    </div>
                </div>
            </li>
    }
    return (
        <div className={'max-w-xl min-w-sm'}>
            <Card>
                <div className={'mb-4 flex justify-between'}>
                    <h5 className="text-xl font-bold leading-none text-yellow-300">
                        Build: {version_number}
                    </h5>
                    <h5 className="text-xl font-bold leading-none text-white">
                        Date: {date_created}
                    </h5>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-700">
                        {changesList}
                    </ul>
                </div>
            </Card>
        </div>
    )
};

export default BuildComponent;
