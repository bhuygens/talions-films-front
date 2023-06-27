"use client"
import React from "react";
import VideoPlayerComponent from "@/app/_common/components/ui/video-player/video-player.component";

type PageProps = {
  id: number
}

const details: Record<string, string> = {
  camera: "TOTOTOTO",
  drone: "tototototo",
  lieu: "lieulieulieu",
}

function Page({id}: PageProps) {

  const displayDetail = () => {
    return Object.entries(details).map(([key, value]) => {
      return (
        <div key={key}>
          <h1>{key}</h1>
          <p>{value}</p>
        </div>
      )
    });
  }


  return (
    <div className={"flex flex-row"}>
      <div>
        <div>
          <p>Titre artiste</p>
          <p>Date</p>
        </div>

        <div>
          <p>contenu</p>
        </div>

        <div>
          {displayDetail()}
        </div>
      </div>

      <div>
        <VideoPlayerComponent videoUrl={"https://vimeo.com/799837807"}/>
      </div>
    </div>
  );
}

export default Page;
