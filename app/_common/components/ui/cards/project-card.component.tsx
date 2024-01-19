import React from "react";
import {useRouter} from "next/navigation";
import {CommonUtil} from "@/app/_common/utils/common.util";
import {ProjectType} from "@/app/_common/domain/enums/projectType";

type PageProps = {
  project: IProject,
  type: ProjectType
}

export function ProjectCardComponent({project, type}: PageProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/projet?type=${type}&id=${project.id}`);
  }

  return (
    <>
      <div
        id={project.id}
        className="parallax-effect w-full min-h-[16rem] text-center flex flex-col justify-center rounded-lg border border-white-600 cursor-pointer"
        data-parallax-speed={0.4}
        style={{backgroundImage: `url(${CommonUtil.getCloudinaryUrl(project.image)})`}}
        onClick={handleClick}
      >
        <div className="p-4 mx-auto w-fit border border-4 border-white-600">
          <h3 className="text-4xl">{project.project_name}</h3>
          <p className="text-2xl">{project.client}</p>
        </div>
      </div>
    </>
  )
}

export default ProjectCardComponent;
