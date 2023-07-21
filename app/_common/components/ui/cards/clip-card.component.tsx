import React from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {useRouter} from "next/navigation";


const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

type PageProps = {
  project: IProject
}

export function ClipCardComponent({project}: PageProps) {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/clips/${project.id}`);
  }

  return (
    <>
      <div
        id={project.id}
        className="thumbnail w-full min-h-[16rem] text-center flex flex-col justify-center rounded-lg border border-white-600 cursor-pointer"
        data-parallax-speed={0.4}
        style={{backgroundImage: `url(${cloudinary.image(project.image).toURL()})`}}
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

export default ClipCardComponent;
