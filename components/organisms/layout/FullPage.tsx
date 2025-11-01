import layoutChildren from "../../../types/layoutChildren";

// makes the view occupy the full page, excluding the header.
const FullPage = (props: layoutChildren) => {
    return (
        <div className='flex flex-col' style={{minHeight: 'calc(100vh - 60px)'}}>
            {props.children}
        </div>
    )
}

export default FullPage;
