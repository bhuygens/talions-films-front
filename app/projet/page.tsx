"use client"
import {useEffect, useState} from "react";
import {Ky} from "@/app/_lib/ky.lib";
import "./style.css";
import {CommonUtil} from "@/app/_common/utils/common.util";
import TagComponent from "@/app/_common/components/ui/tag/tag.component";
import VideoPlayerComponent from "@/app/_common/components/ui/video-player/video-player.component";
import {useSearchParams} from "next/navigation"
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";


function Page() {
  const [project, setProject] = useState<IProject | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams()
  const {setCurrentTab, setBrandPosition} = useHeaderContext()
  useEffect(() => {
    CommonUtil.parallaxEffect();
    setCurrentTab('projet');
    setBrandPosition('top')
  }, []);

  useEffect(() => {
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    Ky.request<IProject>("GET", `/${type}/${id}`).then((res: IProject) => {
      res.date = CommonUtil.formatDate(res.date);
      setProject(res);
      setIsLoading(false);
    });
  }, []);

  const displayDetail = () => {
    const details = project?.details;
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
          </div>,
        );
      }
    }
    return elements;
  };


  const getTags = () => {
    return project && <TagComponent text={project.date}/>
  }
  const getImages = () => {
    const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png", "/7.jpeg"];
    return images.map((path: string, key: number) => {
      return (
        <div
          className="content-section"
          key={key}>
          <div
            className="section-image parallax-effect"
            style={{
              backgroundImage: `
    url(${path})`,
            }}></div>
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
        {project.video_url &&
          <div className="content-section">
            <VideoPlayerComponent videoUrl={project.video_url}/>
          </div>
        }
        {getImages()}
      </div>
    </section>
  ) : (
    <p>Loading</p>
  );
}

export default Page;

