'use client';

import React, {useCallback, useEffect, useState} from "react";
import {AllChangesResponse} from "../../types/allChangesResponse";
import Build from "../../types/build";
import Container from "../common/uiLibrary/container";
import PageHeading from "../common/uiLibrary/PageHeading";
import BuildComponent from "./buildComponent";
import LoadingBuild from "./loading";
import BuildStatsComponent from "./buildStatsComponent";
import LatestReleaseComponent from "./latestReleaseComponent";

interface ReleaseInfo {
  version: string;
  commitSha: string;
}

interface GitHubTag {
  name: string;
  commit: {
    url: string;
    sha: string;
  };
}

const fetchChangelog = async (url: string): Promise<AllChangesResponse> => {
    const response = await fetch(url);
    return await response.json();
}

const fetchLatestRelease = async (): Promise<ReleaseInfo | null> => {
  try {
    const response = await fetch('https://api.github.com/repos/unitystation/unitystation/tags');
    const data = await response.json();
    
    if (data && data.length > 0) {
      const goodFileTags = data
        .filter((tag: GitHubTag) => tag.name.startsWith('good-file-'))
        .sort((a: GitHubTag, b: GitHubTag) => {
          const versionA = a.name.replace('good-file-', '').split('.').map(Number);
          const versionB = b.name.replace('good-file-', '').split('.').map(Number);
          for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
            const numA = versionA[i] || 0;
            const numB = versionB[i] || 0;
            if (numA !== numB) {
              return numB - numA; // Higher version first
            }
          }
          return 0;
        });
      
      if (goodFileTags.length > 0) {
        const latestTag = goodFileTags[0];
        const commitResponse = await fetch(latestTag.commit.url);
        const commitData = await commitResponse.json();
        
        return {
          version: latestTag.name,
          commitSha: latestTag.commit.sha,
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
};

const ChangelogPage = () => {
    const [buildsResponse, setBuildsResponse] = useState<AllChangesResponse>();
    const [builds, setBuilds] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
    const [isLoadingRelease, setIsLoadingRelease] = useState<boolean>(true);
    const INITIAL_PAGE = "https://changelog.unitystation.org/all-changes?limit=10";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsLoadingRelease(true);
            
            try {
                const [changelogResponse, releaseData] = await Promise.all([
                    fetchChangelog(INITIAL_PAGE),
                    fetchLatestRelease()
                ]);
                
                setBuildsResponse(changelogResponse);
                setBuilds(changelogResponse.results);
                setReleaseInfo(releaseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
                setIsLoadingRelease(false);
            }
        };
        
        fetchData();
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
            <div className="flex flex-col gap-4">
                {!!builds && builds.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BuildStatsComponent builds={builds} />
                        {isLoadingRelease ? (
                            <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg">
                                <p className="text-gray-400">Loading latest code-scan release info...</p>
                            </div>
                        ) : releaseInfo ? (
                            <LatestReleaseComponent releaseInfo={releaseInfo} />
                        ) : null}
                    </div>
                )}
                <PageHeading isCentered>Changelog</PageHeading>
                {!!builds && builds.map((build, index) => {
                    return <BuildComponent build={build} key={index}/>
                })}
                {isLoading && <LoadingBuild/>}
            </div>
        </Container>
    )
}

export default ChangelogPage