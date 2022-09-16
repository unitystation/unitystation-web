import layoutChildren from '../../types/layoutChildren';

interface ContainerProps extends layoutChildren {
    isCentered?: boolean;
    isPadded?: boolean;
}


export default function Container (props: ContainerProps) {
    const { children, isCentered=true, isPadded=true} = props;

    return (
        <div className={`container ${ isCentered ? 'mx-auto' : ''} ${isPadded ? 'p-2' : ''}`}>
            {children}
        </div>)
}

