import {BlogPost} from "../../types/blogPost";
import Section from "./section";
import {toAgoTime} from "../../utils/timeUtils";

const Post = (props: BlogPost) => {
    const {title, author, date_created, sections} = props;

    return (
        <>
            <article
                className={'mx-auto w-full px-10 py-10 mb-8 format format-sm sm:format-base lg:format-lg format-invert bg-gray-900 bg-opacity-75'}>
                <header className={'mb-4 lg:mb-6 not-format'}>
                    <address className={'flex items-center mb-6 not-italic'}>
                        <div className="inline-flex items-center mr-3 text-sm text-white">
                            <div>
                                <h1 className="mb-4 text-4xl text-center font-extrabold leading-tight lg:mb-6 text-white">
                                    {title}
                                </h1>
                                <a href="#" rel="author" className="text-xl font-bold text-white">by {author}</a>
                                <p className="text-base font-light text-gray-500 dark:text-gray-400">
                                    <time dateTime={date_created.toString()} title={date_created.toString()}>
                                        {toAgoTime(date_created)}
                                    </time>
                                </p>
                            </div>
                        </div>
                    </address>
                </header>
                <div className={'flex flex-col'}>
                    {sections.map((section, index) => {
                        return (
                            <Section
                                key={index}
                                heading={section.heading}
                                body={section.body}
                            />
                        )
                    })
                    }
                </div>
            </article>
        </>
    )
}

export default Post;
