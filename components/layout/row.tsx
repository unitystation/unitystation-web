import LayoutChildren from '../../types/layoutChildren';

interface RowProps extends LayoutChildren {
    isCentered?: boolean;
    isPadded?: boolean;
}


const Row = (props: RowProps) => {
    const { children, isCentered=true, isPadded=true} = props;
    return (
        <div className={`flex flex-row ${isCentered ? 'items-center' : ''} ${isPadded ? 'p-5' : ''}`}>
            {children}
        </div>
    )
}

export default Row;
