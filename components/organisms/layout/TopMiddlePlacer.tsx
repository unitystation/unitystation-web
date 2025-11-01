// Places the content on the top middle of the screen. Useful for things such as forms and modals.
import layoutChildren from "../../../types/layoutChildren";

const TopMiddlePlacer = (props: layoutChildren) => {
    return (
        <div className="flex items-start justify-center pt-20 md:pt-32">
            {props.children}
        </div>
    );
}

export default TopMiddlePlacer;
