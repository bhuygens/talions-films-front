"use client";

import {useAnimate} from "framer-motion"
import {useEffect} from "react";
import {ImagesConfig} from "@/app/_common/domain/enums/config.enum";
import {ImageModel} from "@/app/_common/domain/types/image.type";
import ImageCardHomeComponent from "@/app/_common/components/images/image-card-home.component";
import HomeImagesColumnComponent from "@/app/_common/components/layout/home-images-column.component";
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";


export default function Home() {
  const [scope, animate] = useAnimate()
  const { setBrandPosition} = useHeaderContext()
  const baseUrl = `https://picsum.photos/${ImagesConfig.imageWidth}`

  useEffect(() => {
    animate("img", {opacity: 1}, {duration: 5});
    setBrandPosition('middle');
  }, [])
  const generateRandomImagesColumn = () => {
    const images: ImageModel[] = [];

    for (let i = 0; i < ImagesConfig.imagesPerLine; i++) {
      const randomHeight = Math.floor(Math.random() * (ImagesConfig.maxImageHeight - ImagesConfig.imageWidth + 1) + ImagesConfig.imageWidth)
      const image = `${baseUrl}/${randomHeight}`;
      images.push({
        url: image,
        width: ImagesConfig.imageWidth,
        height: randomHeight,
      });
    }

    return (
      <div className={"flex flex-col gap-4 p-4"}>
        {images.map((image: ImageModel, key: number) =>
          <ImageCardHomeComponent height={image.height} key={key} url={image.url} width={image.width}/>,
        )}
      </div>
    )
  }

  const handleTabClick = (tab: string) => {
    //  console.log("click", tab)
  }

  return (
    <div className={"w-screen h-screen overflow-hidden flex flex-row justify-between relative p-6"} ref={scope}>
      <div className={"flex flex-row gap-12"}>
        <HomeImagesColumnComponent baseVelocity={4}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
        <HomeImagesColumnComponent baseVelocity={-8}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
      </div>



      <div className={"flex flex-row gap-12"}>
        <HomeImagesColumnComponent baseVelocity={7}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
        <HomeImagesColumnComponent baseVelocity={-10}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
      </div>
    </div>
  )
}

