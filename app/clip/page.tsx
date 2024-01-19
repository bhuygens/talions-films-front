"use client"
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import ProjectCardComponent from "@/app/_common/components/ui/cards/project-card.component";
import {Ky} from "@/app/_lib/ky.lib";
import {CommonUtil} from "@/app/_common/utils/common.util";
import {ProjectType} from "@/app/_common/domain/enums/projectType";


function Page() {
  const [clips, setClips] = useState<IProject[]>([]);

  useEffect(() => {
    fetchClips().catch(e => console.log(e))
  }, [])
  const fetchClips = async () => {
    try {
      const apiClips = await Ky.request("GET", "/clip");
      setClips(apiClips as IProject[]);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    CommonUtil.parallaxEffect();
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
            <ProjectCardComponent project={project} type={ProjectType.Clip}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </main>
  )
}

export default Page;
