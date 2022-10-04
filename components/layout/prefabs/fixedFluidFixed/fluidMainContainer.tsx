import LayoutChildren from '../../../../types/layoutChildren';

const FluidMainContainer = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <main role={'main'} className="w-full flex-grow pt-1 px-3">
            {children}
        </main>
    );

}

export default FluidMainContainer;
