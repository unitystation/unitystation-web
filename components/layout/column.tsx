import layoutChildren from '../../types/layoutChildren';

interface ColumnProps extends layoutChildren {
    isCentered?: boolean;
}

const Column = (props: ColumnProps) => {
    const {children, isCentered=false} = props;
    return (
        <div className={`flex flex-col ${isCentered ? 'items-center': ''}`}>
            {children}
        </div>
    )
}

export default Column;
