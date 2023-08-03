"use client";

import {useAnimate} from "framer-motion"
import {useEffect, useState} from "react";
import {ImagesConfig} from "@/app/_common/domain/enums/config.enum";
import {ImageModel} from "@/app/_common/domain/types/image.type";
import ImageCardHomeComponent from "@/app/_common/components/ui/cards/home-image-card.component";
import HomeImagesColumnComponent from "@/app/_common/components/layout/home-images-column.component";
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";
import {Ky} from "@/app/_lib/ky.lib";
import {ProjectType} from "@/app/_common/domain/enums/projectType";

type randomImage = {
  id: string,
  image: string
  type: string
}

export default function Home() {
  const [scope, animate] = useAnimate()
  const [imagesUrls, setImagesUrls] = useState<randomImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {setBrandPosition} = useHeaderContext()

  useEffect(() => {
    setBrandPosition("middle");
    getImagesUrls();
  }, []);


  const getImagesUrls = (): void => {
    Ky.request<randomImage[]>("GET", "/common/random-images").then((images) => {
      setImagesUrls(images);
      setIsLoading(false);
    });
  };
  const generateRandomImagesColumn = () => {
    const images: ImageModel[] = [];

    for (let i = 0; i < ImagesConfig.imagesPerLine; i++) {
      const randomHeight = Math.floor(Math.random() * (ImagesConfig.maxImageHeight - ImagesConfig.imageWidth + 1) + ImagesConfig.imageWidth);
      const randomImageNumber = Math.floor(Math.random() * images.length);
      images.push({
        url: imagesUrls[randomImageNumber].image,
        width: ImagesConfig.imageWidth,
        height: randomHeight,
        id: imagesUrls[randomImageNumber].id,
        type: imagesUrls[randomImageNumber].type,
      });
    }

    return (
      <div className={"flex flex-col gap-4 p-4"}>
        {images.map((image: ImageModel, key: number) =>
          <ImageCardHomeComponent height={image.height} key={key} cloudinaryImageName={image.url} width={image.width}
                                  type={image.type as ProjectType} id={image.id}/>,
        )}
      </div>
    )
  }

  return (
    <>
      {isLoading ? <p>Loading...</p> : (
        <div className={"w-screen h-screen overflow-hidden flex flex-row justify-between relative p-6"} ref={scope}>
          <>
            <div className={"flex flex-row gap-12"}>
              <HomeImagesColumnComponent baseVelocity={4}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
              <HomeImagesColumnComponent baseVelocity={-8}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
            </div>

            <div className={"flex flex-row gap-12"}>
              <HomeImagesColumnComponent baseVelocity={7}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
              <HomeImagesColumnComponent baseVelocity={-10}>{generateRandomImagesColumn()}</HomeImagesColumnComponent>
            </div>
          </>
        </div>
      )}
    </>
  );
}
