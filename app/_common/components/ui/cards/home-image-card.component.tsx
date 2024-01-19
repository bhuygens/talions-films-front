import React, {useEffect, useState} from "react";
import Image from "next/image";
import {CommonUtil} from "@/app/_common/utils/common.util";
import {ProjectType} from "@/app/_common/domain/enums/projectType";
import {useRouter} from "next/navigation";
import {useAnimate} from "framer-motion";

type HomeImageCardComponent = {
  key: number;
  cloudinaryImageName: string;
  width: number;
  height: number;
  type: ProjectType,
  id: string
};

function ImageCardHomeComponents({
                                   height,
                                   cloudinaryImageName,
                                   width,
                                   type, id,
                                 }: HomeImageCardComponent) {
  const router = useRouter()
  const [scope, animate] = useAnimate()

  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");

  useEffect(() => {
    setCloudinaryUrl(CommonUtil.getCloudinaryUrl(cloudinaryImageName));
  }, [cloudinaryImageName, cloudinaryUrl]);

  useEffect(() => {
    cloudinaryUrl.length > 0 && animate("img", {opacity: 1}, {duration: 5});
  }, [cloudinaryUrl])
  const handleClick = () => {
    router.push(`projet?type=${type}&id=${id}`);
  }
  return (
    <div style={{width, height, position: "relative"}} onClick={handleClick} ref={scope}>
      {cloudinaryUrl.length > 0 && <Image
        alt={"image"}
        className={"rounded-md opacity-1 object-cover"}
        unoptimized={true}
        src={cloudinaryUrl}
        width={width}
        height={height}
        style={{objectFit: "cover"}}
        priority={true}
      />}
    </div>
  );
}

export default ImageCardHomeComponents;
