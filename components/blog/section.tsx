import {BlogPostSection} from "../../types/blogPost";

const Section = (props: BlogPostSection) => {
    const {heading, body} = props;

    return (
        <section className={'mt-8'}>
            {heading && <h2 className={'mb-4 text-2xl text-center font-bold leading-tight lg:mb-6 text-white'}>{heading}</h2>}
            <div className={'ck-content'} dangerouslySetInnerHTML={{__html: body}}/>
        </section>
    )
}

export default Section;
