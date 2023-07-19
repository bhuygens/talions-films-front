"use client"
import React, {useEffect, useState} from "react";
import VideoPlayerComponent from "@/app/_common/components/ui/video-player/video-player.component";

const {Client} = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
type PageProps = {
  projectId: number
}

const details: Record<string, string> = {
  camera: "TOTOTOTO",
  drone: "tototototo",
  lieu: "lieulieulieu",
}

function Page({projectId}: PageProps) {
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    let headersList = {
      "Accept": "*/*",
      "Authorization": "Bearer secret_k9Rpae1NgR1Ms40xjVs4lFvraIkAm1i2ZNO1L4BS6cD",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    }

    let response = await fetch("https://api.notion.com/v1/databases/92a7528ba93e4248bd44f294a65167d3", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.text();
    console.log(data);
  }

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
