import type { IconType } from "react-icons";
import { FaBalanceScale, FaQuestion, FaWrench } from "react-icons/fa";
import { FaArrowUp, FaCirclePlus } from "react-icons/fa6";
import type { Tone } from "../../components/ui/tones";
import { toneText } from "../../components/ui/tones";
import Change from "../../types/change";

const CATEGORY_META: Record<string, { icon: IconType; tone: Tone }> = {
    NEW: { icon: FaCirclePlus, tone: "success" },
    FIX: { icon: FaWrench, tone: "warning" },
    IMPROVEMENT: { icon: FaArrowUp, tone: "info" },
    BALANCE: { icon: FaBalanceScale, tone: "primary" },
};

export default function ChangeRow({ change }: { change: Change }) {
    const { author_username, author_url, description, pr_url, pr_number, category } = change;
    const { icon: Icon, tone } = CATEGORY_META[category] ?? {
        icon: FaQuestion,
        tone: "neutral" as Tone,
    };

    return (
        <li className="flex items-start gap-4 py-3">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${toneText[tone]}`} title={category} />
            <div className="min-w-0 flex-1">
                <p className="text-sm text-crew">{description}</p>
                <p className="mt-0.5 text-xs text-faint">
                    contributed by{" "}
                    <a href={author_url} className="text-dim hover:text-crew hover:underline">
                        {author_username}
                    </a>{" "}
                    in{" "}
                    <a href={pr_url} className="text-accent hover:text-crew hover:underline">
                        PR #{pr_number}
                    </a>
                </p>
            </div>
        </li>
    );
}
