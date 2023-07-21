"use client"
import React, { useEffect, useState } from "react";
import { Ky } from "@/app/_lib/ky.lib";
import VideoPlayerComponent from "@/app/_common/components/ui/video-player/video-player.component";

const details: Record<string, string> = {
  camera: "TOTOTOTO",
  drone: "tototototo",
  lieu: "lieulieulieu",
};

function Page({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<IProject | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(params.id);
    Ky.request("GET", `/clips/${params.id}`).then((res) => {
      setProject(res as unknown as IProject);
      setIsLoading(false); // Move the setIsLoading inside the promise resolution
    });
  }, [params.id]); // Add 'params.id' as a dependency to re-fetch data when the id changes

  const displayDetail = () => {
    return Object.entries(details).map(([key, value]) => {
      return (
        <div key={key}>
          <h1>{key}</h1>
          <p>{value}</p>
        </div>
      );
    });
  };

  return !isLoading ? (
    <div className={"flex flex-row"}>
      <div>
        <div>
          <p>{project?.project_name}</p>
          <p>{project?.client}</p>
          <p>{project?.image}</p>
          <p>{project?.type}</p>

        </div>
        <div>
          <p>contenu</p>
        </div>
        <div>{displayDetail()}</div>
      </div>
      <div>
        <VideoPlayerComponent videoUrl={"https://vimeo.com/799837807"} />
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default Page;
