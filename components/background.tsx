import LayoutChildren from '../types/layoutChildren';

const Background = ({children}: LayoutChildren) => {
    return (
        <div className={'bg-scroll bg-layer1 h-screen'}>
            {children}
        </div>
    )
}

export default Background;
