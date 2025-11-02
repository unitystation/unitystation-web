import Change from "../../../types/change";
import {IconType} from "react-icons";
import classNames from "classnames";
import {FaArrowUp, FaCirclePlus} from "react-icons/fa6";
import {FaBalanceScale, FaQuestion, FaWrench} from "react-icons/fa";

const CATEGORY_ICON_MAP: Record<string, IconType> = {
    NEW: FaCirclePlus,
    FIX: FaWrench,
    IMPROVEMENT: FaArrowUp,
    BALANCE: FaBalanceScale,
};

const CATEGORY_COLOUR_MAP: Record<string, string> = {
    NEW: "text-green-500",
    FIX: "text-orange-600",
    IMPROVEMENT: "text-blue-600",
    BALANCE: "yellow-200",
};

interface ChangeProps {
    change: Change;
}

const ChangeComponent = (props: ChangeProps) => {
    const {author_username, author_url, description, pr_url, pr_number, category} = props.change;
    const Icon = CATEGORY_ICON_MAP[category] ?? FaQuestion;
    const colourClass = CATEGORY_COLOUR_MAP[category] ?? 'text-white';

    return (
        <li className='py-3 sm:py-4'>
            <div className='flex items-center space-x-4'>
                <div className="shrink-0">
                    <Icon className={classNames("text-xl", colourClass)} />
                </div>
                <div className={"min-w-0 flex-1"}>
                    <p className={"text-sm font-medium text-white-900"}>
                        {description}
                    </p>
                    <p className="text-sm text-gray-400">
                        contributed by <a href={author_url} className={"text-gray-400 hover:text-gray-500 hover:underline"}>{author_username} </a>
                        in <a href={pr_url} className={"text-blue-500 hover:text-purple-500 hover:underline"}>PR
                        #{pr_number}</a>
                    </p>
                </div>
            </div>
        </li>
    );
};

export default ChangeComponent;
