import LayoutChildren from '../../../types/layoutChildren';

const flexPageContainer = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <div className={'w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow'}>
            {children}
        </div>
    )
}

export default flexPageContainer;
