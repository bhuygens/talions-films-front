import React from "react";
import {Cloudinary} from '@cloudinary/url-gen';

interface IProject {
    id: number,
    title: string,
    artist: string,
    description: string,
    url?: string,
    camera?: string,
    image?: string
  }

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    url: {
      secure: true,
    },
  });

export function Project (props: {project: IProject, id: string}) {
    
    return (
        <>
            <div 
                id={props.id}
                className="thumbnail w-full min-h-[16rem] text-center flex flex-col justify-center rounded-lg border border-white-600"
                data-parallax-speed={0.4}
                style={{ backgroundImage: `url(${cloudinary.image(props.project.image).toURL()})`}}
            >
                <div className="p-4 mx-auto w-fit border border-4 border-white-600">
                    <h3 className="text-4xl">{props.project.title}</h3>
                    <p className="text-2xl">{props.project.artist}</p>
                </div>
            </div>
        </>
    )
}