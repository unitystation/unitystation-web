import LayoutChildren from '../../types/layoutChildren';


const Section = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <section className={"h-100"}>
            <div className="container p-4 mx-auto">
                {children}
            </div>
        </section>
    )
}

export default Section;
