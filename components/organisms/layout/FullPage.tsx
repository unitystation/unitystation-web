// makes the view occupy the full page, excluding the header.
import {DivCommonProps} from "../../../types/ComponentProps";

const FullPage = (props: DivCommonProps) => {
    return (
        <div className='flex flex-col' style={{minHeight: 'calc(100vh - 60px)'}}>
            {props.children}
        </div>
    )
}

export default FullPage;
