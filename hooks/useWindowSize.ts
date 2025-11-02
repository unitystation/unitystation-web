import {useEffect, useState} from 'react';

const getWindowSize = () => ({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
});

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

export default useWindowSize;
