import {NextPage} from "next";
import FlexPageContainer from "../components/layout/prefabs/flexPageContainer";
import {useEffect, useState} from "react";
import Post from "../components/blog/post";
import {BlogPostsResponse} from "../types/blogPostsResponse";

const Blog: NextPage = () => {
    const [posts, setPosts] = useState({} as BlogPostsResponse);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://changelog.unitystation.org/posts`)
            .then(response => response.json())
            .then(json => setPosts(json))
            .then(() => setLoading(false))
    }, [currentPage]);

    return (
        <>
            <main className={'pt-8 pb-16 lg:pt-16 lg:pb-24'}>
                <div className={'flex px-4 mx-auto max-w-screen-xl '}>
                    {!loading && <div>
                    {posts.results.map((post) => {
                        return (
                            <Post
                                key={post.slug}
                                title={post.title}
                                date_created={post.date_created}
                                slug={post.slug}
                                sections={post.sections}
                                author={post.author}
                                state={post.state}
                                type={post.type}
                            />
                        )
                    })}
                </div>}
                </div>
            </main>
        </>
    )
}

export default Blog;
