import React, {useEffect} from "react";
import {Cloudinary} from "@cloudinary/url-gen";


const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

type PageProps = {
  id: string,
  project: ClipModel
}

export function ClipCardComponent({project, id}: PageProps) {

  useEffect(() => {
    project
  }, [])
  return (
    <>
      <div
        id={id}
        className="thumbnail w-full min-h-[16rem] text-center flex flex-col justify-center rounded-lg border border-white-600"
        data-parallax-speed={0.4}
        style={{backgroundImage: `url(${cloudinary.image(project.image).toURL()})`}}
      >
        <div className="p-4 mx-auto w-fit border border-4 border-white-600">
          <h3 className="text-4xl">{project.title}</h3>
          <p className="text-2xl">{project.artist}</p>
        </div>
      </div>
    </>
  )
}

export default ClipCardComponent;
