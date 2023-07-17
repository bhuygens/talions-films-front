import React from "react";
import Image from "next/image";

type HomeImageCardComponent = {
  key: number,
  url: string,
  width: number,
  height: number,
}

function ImageCardHomeComponents({height, url, width}: HomeImageCardComponent) {

  return (
    <Image loader={() => url}
           width={width}
           height={height}
           alt={"image"}
           className={"rounded-md opacity-0"}
           unoptimized={true}
           src={url}/>
  );
}

export default ImageCardHomeComponents;
