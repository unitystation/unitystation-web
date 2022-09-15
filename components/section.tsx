import LayoutChildren from '../types/layoutChildren';

const Section = ({children}: LayoutChildren) => {
    return (
        <section className={'text-white'}>
            <div className={'px-4 py-32 mx-auto max-w-screen-xl lg:h-screen lg:items-center lg:flex'}>
                {children}
            </div>
        </section>)
}

export default Section;
