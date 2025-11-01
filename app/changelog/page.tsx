'use client';

import React, {useCallback, useEffect, useState} from "react";
import {AllChangesResponse} from "../../types/allChangesResponse";
import Build from "../../types/build";
import Container from "../../components/molecules/layout/Container";
import PageHeading from "../../components/atoms/PageHeading";
import BuildComponent from "../../components/organisms/changelog/BuildComponent";
import LoadingBuild from "./loading";

const fetchChangelog = async (url: string): Promise<AllChangesResponse> => {
    const response = await fetch(url);
    return await response.json();
}

const ChangelogPage = () => {
    const [buildsResponse, setBuildsResponse] = useState<AllChangesResponse>();
    const [builds, setBuilds] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const INITIAL_PAGE = "https://changelog.unitystation.org/all-changes?limit=5";

    useEffect(() => {
        fetchChangelog(INITIAL_PAGE).then((response) => {
            setIsLoading(true);
            setBuildsResponse(response);
            setBuilds(response.results);
        }).finally(
            () => setIsLoading(false)
        )
    }, []);

    const handleScroll = useCallback(async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !buildsResponse?.next) return;
        setIsLoading(true);
        const json = await fetchChangelog(buildsResponse.next);

        setBuilds((prevBuilds) => [...prevBuilds, ...json.results]);
        setBuildsResponse(json);
        setIsLoading(false);
    }, [buildsResponse]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Container>
            <PageHeading isCentered>Changelog</PageHeading>
            <div className="flex flex-col gap-4">
                {!!builds && builds.map((build, index) => {
                    return <BuildComponent build={build} key={index}/>
                })}
                {isLoading && <LoadingBuild/>}
            </div>
        </Container>
    )
}

export default ChangelogPage
