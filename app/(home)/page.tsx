import LandingText from "./landingText";
import {BlogPost} from "../../types/blogPost";
import {BlogPostsResponse} from "../../types/blogPostsResponse";
import FetchOfType from "../../utils/fetchOfType";
import LandingButtonsServer from "./LandingButtonsServer";
import DownloadButtonClient from "./DownloadButtonClient";
import LatestNews from "./latestNews";
import ContactInformation from "./contactInformation";
import React from "react";
import dynamic from 'next/dynamic';

const mainText = "Welcome to Unitystation!";
const secondaryText = "Free and open-source remake of the cult classic Space Station 13, made in Unity Engine.";
const fetchLatestBlogPost = async (): Promise<BlogPost[]> => {
    const revalidateConfig = {next: {revalidate: 60}};
    const resPage1 = await FetchOfType<BlogPostsResponse>('https://changelog.unitystation.org/posts/', revalidateConfig);
    const resPage2 = await FetchOfType<BlogPostsResponse>('https://changelog.unitystation.org/posts/?page=2', revalidateConfig);
    return resPage1.results.concat(resPage2.results);
}

const HomePage = async () => {
    const latestBlogPosts: BlogPost[] = await fetchLatestBlogPost();
    const NoSsrHomebannerClient = dynamic(() => import('./HomeBannerClient'), { ssr: false });

    return (
        <>
            <div className="flex flex-col justify-center gap-6">
                <div className="flex-[1]">
                    <NoSsrHomebannerClient>
                        <LandingText mainText={mainText} secondaryText={secondaryText}/>
                        <DownloadButtonClient/>
                        <LandingButtonsServer/>
                    </NoSsrHomebannerClient>
                </div>
                <div className="flex-[1]">
                    <LatestNews posts={latestBlogPosts}/>
                </div>
            </div>

            <ContactInformation/>
        </>
    );
};

export default HomePage;