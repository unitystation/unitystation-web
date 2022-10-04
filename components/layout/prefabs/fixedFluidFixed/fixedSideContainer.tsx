import LayoutChildren from '../../../../types/layoutChildren';

const FixedSideContainer = (props: LayoutChildren) => {
    const {children } = props;
    return (
        <div className={'w-fixed w-1/6 flex-shrink flex-grow-0 px-4'}>
            {children}
        </div>
    )
}

export default FixedSideContainer;
