import {BlogPost} from "../../types/blogPost";
import classNames from "classnames";
import Container from "../common/uiLibrary/container";
import PageSectionTitle from "../common/uiLibrary/pageSectionTitle";
import LinkButton from "../common/uiLibrary/linkButton";
import Image from "next/image";

interface PostPreviewCardProps {
    post: BlogPost,
    isMain?: boolean,
    className?: string
}

interface LatestNewsProps {
    posts: BlogPost[]
    className?: string
}

const PostPreviewImage = ({post, isMain = false, className}: PostPreviewCardProps) => {
    const outerContainerStyles = classNames(
        {'flex-1 overflow-hidden': isMain},
        {'w-full xl:w-1/3 overflow-hidden rounded-lg': !isMain},
    )

    const innerContainerStyles = classNames(
        {'w-full h-32 lg:h-40': !isMain},
        'overflow-hidden', 'rounded-lg',
        {'h-full' : isMain}
    )

    return (
        <div className={classNames(outerContainerStyles, {className})}>
            <div className={innerContainerStyles}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.socials_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

const PostPreviewBody = ({post, isMain = false, className}: PostPreviewCardProps) => {
    const truncateSummary = (text: string) => {
        const maxChars = 100;

        if (isMain) {
            return text;
        }
        return text.length > maxChars ? text.slice(0, maxChars - 3) + '...' : text;
    };

    const styles = classNames(
        'mt-4',
        {'lg:mt-0 lg:ml-4 lg:flex-1': !isMain}

    );

    const titleStyles = classNames(
        {'text-xl': isMain},
        {'text-l': !isMain},
        'font-bold text-white-800 mb-2'
    );

    return (
        <div className={classNames(styles, {className})}>
            <h3 className={titleStyles}>{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{new Date(post.date_created).toLocaleDateString()}</p>
            <p className="text-gray-400">{truncateSummary(post.summary)}</p>
        </div>
    )
}

const PostPreviewCard = ({post, isMain}: PostPreviewCardProps) => {
    const style = classNames(
        'flex',
        'flex-col',
        'flex-1',
        'hover:border-l hover:border-r hover:border-b hover:border-t hover:border-gray-700 hover:rounded-lg',
        'group',
        'mb-8 xl:mb-0',
        {'xl:max-w-[600px]': isMain},
        {'xl:max-w-[550px] xl:flex-row': !isMain},
    );

    return (
        <a href={`/blog/${post.slug}`} className={style}>
            <PostPreviewImage post={post}  isMain={isMain} />
            <PostPreviewBody post={post} isMain={isMain} />
        </a>
    );
};

const LatestNews = (props: LatestNewsProps) => {
    const {posts, className} = props;

    return (
        <div className={className}>
            <PageSectionTitle>Latest News</PageSectionTitle>
            <Container>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col xl:flex-row gap-6 justify-center">
                        <PostPreviewCard post={posts[0]} isMain={true} className="flex flex-col"/>

                        <div className="flex flex-col justify-between gap-6 xl:gap-0">
                            {posts.slice(1).map((post) => (
                                <PostPreviewCard key={post.slug} post={post} isMain={false}/>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end px-20">
                        <LinkButton filled={false} text="Read More" linkTo="/blog" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default LatestNews;
