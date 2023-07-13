"use client";

import {useAnimate} from "framer-motion"
import {useEffect} from "react";
import {ImagesConfig} from "@/app/_common/domain/enums/config.enum";
import {ImageModel} from "@/app/_common/domain/types/image.type";
import ImageCardHomeComponent from "@/app/_common/components/images/image-card-home.component";
import TranslateYComponent from "@/app/_common/components/translateY.component";
import { getDatabase } from "./lib/notion";

// const databaseId = process.env.NOTION_DATABASE_ID!

const tabs = {
  clips: "Clips",
  events: "Evenements",
  pubs: "Pubs",
};


export default function Home() {
  const [scope, animate] = useAnimate()

  const baseUrl = `https://picsum.photos/${ImagesConfig.imageWidth}`
    // const getProps = async () => {
    //   const database = await getDatabase(databaseId);

    //   return {
    //     props: {
    //       posts: database,
    //     },
    //     // Next.js will attempt to re-generate the page:
    //     // - When a request comes in
    //     // - At most once every second
    //     // revalidate: 1, // In seconds
    //   };
    // };

  // useEffect(() => {
  //   getProps()
  // }, [])

  const generateRandomImagesLine = () => {
    const images: ImageModel[] = [];

  useEffect(() => {
    animate("img", {opacity: 1}, {duration: 5})
  })
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
        <TranslateYComponent baseVelocity={4}>{generateRandomImagesColumn()}</TranslateYComponent>
        <TranslateYComponent baseVelocity={-8}>{generateRandomImagesColumn()}</TranslateYComponent>
      </div>



      <div className={"flex flex-row gap-12"}>
        <TranslateYComponent baseVelocity={7}>{generateRandomImagesColumn()}</TranslateYComponent>
        <TranslateYComponent baseVelocity={-10}>{generateRandomImagesColumn()}</TranslateYComponent>
      </div>
    </div>
  )
}
}
