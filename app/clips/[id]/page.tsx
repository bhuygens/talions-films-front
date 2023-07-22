"use client"
import React, {useEffect, useState} from "react";
import {Ky} from "@/app/_lib/ky.lib";
import VideoPlayerComponent from "@/app/_common/components/ui/video-player/video-player.component";
import './style.css';
import TagComponent from "@/app/_common/components/ui/tag/tag.component";
import {CommonUtil} from "@/app/_common/utils/common.util";

const details: Record<string, string> = {
  camera: "TOTOTOTO",
  drone: "tototototo",
  lieu: "lieulieulieu",
};

interface IResponseData {
  date: string;
  // Add other properties you expect in the response
}

function Page({params}: { params: { id: string } }) {
  const [project, setProject] = useState<IProject | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CommonUtil.parallaxEffect();
  }, []);

  useEffect(() => {
    console.log(params.id);
    Ky.request<IProject>("GET", `/clips/${params.id}`).then((res: IProject) => {
      res.date = CommonUtil.formatDate(res.date);
      setProject(res);
      setIsLoading(false);
    });

  }, [params.id]);

  const displayDetail = () => {
    const details = project && project.details;
    console.log(details);

    const elements = [];
    for (const key in details) {
      if (details.hasOwnProperty(key)) {
        // @ts-ignore
        const value = details[key];
        elements.push(
          <div className="detail-item" key={key}>
            <h1 className="detail-item-title">{CommonUtil.capitalizeFirstLetter(key)}: </h1>
            <p className="detail-item-content">{value}</p>
          </div>
        );
      }
    }
    return elements;
  };


  const getTags = () => {
    return project && <TagComponent text={project.date}/>
  }
  const getImages = () => {
    const images = ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png', '/7.jpeg'];
    return images.map((path: string, key: number) => {
      return (
        <div
          className="content-section"
          key={key}>
          <div
            className="section-image parallax-effect"
            style={{backgroundImage: `url(${path})`}}></div>
        </div>
      )
    });
  }

  return (!isLoading && project) ? (
    <section>
      <div className="left-section flex flex-col justify-between">
        <div>
          <div className="left-section-tags mb-6">
            {getTags()}
          </div>
          <div className="left-section-project">
            <h1 className="text-6xl ">{project.project_name}</h1>
            <h3 className="text-xl grey-text">{project.client}</h3>
          </div>
        </div>

        <div className="left-section-details">
          {displayDetail()}
        </div>

      </div>
      <div className="c-sections">
        <div className="content-section">
          <VideoPlayerComponent videoUrl={"https://vimeo.com/799837807"}/>
        </div>
        {getImages()}
      </div>
    </section>
  ) : (
    <p>Loading</p>
  );
}

export default Page;

