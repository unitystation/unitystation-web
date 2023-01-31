import {NextPage} from "next";
import Post from "../../components/blog/post";
import React, {useEffect, useState} from "react";
import {BlogPost} from "../../types/blogPost";
import {useRouter} from 'next/router';
import Head from "next/head";

const PostPage: NextPage = () => {
    const router = useRouter();
    const {slug} = router.query;
    const [post, setPost] = useState({} as BlogPost);

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`https://changelog.unitystation.org/posts/${slug}`)
            .then(response => response.json())
            .then(json => setPost(json))
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title key={'title'}>Unitystation - {post?.title}</title>
                <meta
                    key='description'
                    name='description'
                    content='Read more about this interesting article on our blog!'
                />
                <meta
                    key='og:title'
                    property='og:title'
                    content='Unitystation - A blog post'
                />
                <meta
                    key='og:description'
                    property='og:description'
                    content='Read more about this interesting article on our blog!'
                />
            </Head>

            <main className={'pt-8 pb-16 lg:pt-16 lg:pb-24'}>
                <div className={'flex px-4 mx-auto max-w-screen-xl '}>
                    {<Post
                        key={post.slug}
                        title={post.title}
                        date_created={post.date_created}
                        slug={post.slug}
                        sections={post.sections}
                        author={post.author}
                        state={post.state}
                        type={post.type}
                    />}
                </div>
            </main>
        </>

    )
}

export default PostPage;