"use client"
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import ClipCardComponent from "@/app/_common/components/ui/cards/clip-card.component";
import {Ky} from "@/app/_lib/ky.lib";


function Page() {
  const [clips, setClips] = useState<IProject[]>([]);

  useEffect(() => {
    fetchClips().catch(e => console.log(e))
  }, [])
  const fetchClips = async () => {
    try {
      const apiClips = await Ky.request("GET", "/clips");
      setClips(apiClips as IProject[]);
    } catch (e) {
      console.log(e);
    }
  }

  function updateBackgroundImage() {
    const windowHeight = window.innerHeight
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".thumbnail");

    const offset = -60;
    elements.forEach(element => {
      const parallaxEffect = element.dataset.parallaxSpeed || 0.6;

      element.style.backgroundPositionY = `${
        (+parallaxEffect * (element.getBoundingClientRect().top / windowHeight * 100))
      }%`;
    })
  }


  useEffect(() => {
    window.addEventListener("scroll", updateBackgroundImage)
  })

  return (
    <main className="mx-auto flex flex-col">
      <AnimatePresence mode="wait">
        {clips?.map((project, index) => (
          <motion.div
            key={index}
            className="w-[80%] mt-2 mx-auto "
            whileHover={{scale: 1.05}}
            transition={{type: "spring", stiffness: 150, damping: 20}}
          >
            <ClipCardComponent project={project}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </main>
  )
}

export default Page;
