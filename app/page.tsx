"use client";

import {motion, useAnimate} from "framer-motion"
import {useEffect} from "react";
import TranslateYComponent from "@/app/components/translateY.component";

const tabs = {
  clips: "Clips",
  events: "Evenements",
  pubs: "Pubs",
};

const imagesConfig = {
  imageWidth: 250,
  maxImageHeight: 400,
  imagesPerLine: 10,
}
type imageModel = {
  url: string,
  width: number,
  height: number
}

export default function Home() {
  const [scope, animate] = useAnimate()

  const baseUrl = `https://picsum.photos/${imagesConfig.imageWidth}`

  useEffect(() => {
    animate("img", {opacity: 1}, {duration: 5})
  })
  const generateRandomImagesLine = () => {
    const images: imageModel[] = [];

    for (let i = 0; i < imagesConfig.imagesPerLine; i++) {
      const randomHeight = Math.floor(Math.random() * (imagesConfig.maxImageHeight - imagesConfig.imageWidth + 1) + imagesConfig.imageWidth)
      const image = `${baseUrl}/${randomHeight}`;
      images.push({
        url: image,
        width: imagesConfig.imageWidth,
        height: randomHeight,
      });
    }

    return (
      <div className={"flex flex-col gap-4 p-4"}>
        {images.map((image, key) =>
          <img key={key} src={image.url}
               width={image.width}
               height={image.height}
               alt={key.toString()}
               className={"rounded-md opacity-0"}
          />,
        )}
      </div>
    )
  }

  const displayTabs = () => {
    return (
      <motion.div
        className={"flex flex-row justify-evenly"}
        variants={{
          hidden: {opacity: 0, y: 50},
          visible: {opacity: 1, y: 0, transition: {duration: 3, delay: 2}},
        }}
      >
        {Object.values(tabs).map((tab, key) =>
          <p key={key} className={"text-green-800 text-4xl cursor-pointer font-kenyan-coffee hover:underline"}>
            {tab}
          </p>,
        )}
      </motion.div>
    )
  }

  return (
    <div className={"w-screen h-screen overflow-hidden flex flex-row justify-between relative p-6"} ref={scope}>
      <div className={"flex flex-row gap-12"}>
        <TranslateYComponent baseVelocity={4}>{generateRandomImagesLine()}</TranslateYComponent>
        <TranslateYComponent baseVelocity={-8}>{generateRandomImagesLine()}</TranslateYComponent>
      </div>

      <motion.article
        initial="hidden"
        animate="visible"
        exit={{opacity: 0, transition: {duration: 2}}}
        className={"absolute top-1/2 left-1/2 translate-50 z-10"}
      >
        <div className={"flex flex-row"}>
          <motion.h1
            className={"c-red text-8xl whitespace-nowrap font-akira mr-10"}
            variants={{
              hidden: {opacity: 0, y: -500},
              visible: {opacity: 1, y: 0, transition: {duration: 2}},
            }}>
            Talion
          </motion.h1>
          <motion.h1
            className={"c-red text-8xl whitespace-nowrap font-akira"}
            variants={{
              hidden: {opacity: 0, y: 500},
              visible: {opacity: 1, y: 0, transition: {duration: 2}},
            }}>
            Films
          </motion.h1>
        </div>

        {displayTabs()}
      </motion.article>

      <div className={"flex flex-row gap-12"}>
        <TranslateYComponent baseVelocity={7}>{generateRandomImagesLine()}</TranslateYComponent>
        <TranslateYComponent baseVelocity={-10}>{generateRandomImagesLine()}</TranslateYComponent>
      </div>
    </div>
  )
}
