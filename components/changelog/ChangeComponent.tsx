import Change from '../../types/change';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus, faWrench, faArrowUp, faBalanceScale, faQuestion} from '@fortawesome/free-solid-svg-icons';

const ChangeComponent = (props: Change) => {
    const { author_username, author_url, description, pr_url, pr_number, category } = props;
    return (
        <li className={'py-3 sm:py-4'}>
            <div className={'flex items-center space-x-4'}>
                <div className={'shrink-0'}>
                    <FontAwesomeIcon className={'text-xl'} icon={determineIcon(category)}></FontAwesomeIcon>
                </div>
                <div className={'min-w-0 flex-1'}>
                    <p className={'text-sm font-medium text-white-900'}>
                        {description}
                    </p>
                    <p className="text-sm text-gray-400">
                        contributed by <a href={author_url} className={'text-gray-400 hover:text-gray-500 hover:underline'}>{author_username}</a> in <a href={pr_url} className={'text-gray-400 hover:text-gray-500 hover:underline'}>PR #{pr_number}</a>
                    </p>
                </div>
            </div>
        </li>
    )
}

const determineIcon = (category: string) => {
    switch (category) {
        case 'NEW':
            return faCirclePlus;
        case 'FIX':
            return faWrench;
        case 'IMPROVEMENT':
            return faArrowUp;
        case 'balance':
            return faBalanceScale;
        default:
            return faQuestion;
    }
}

export default ChangeComponent;
