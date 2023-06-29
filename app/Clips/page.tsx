"use client"

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from '../components/Project';
 

const tabs= [
  { id: 1, label: 'Clips' },
  { id: 2, label: 'Evenements'},
  { id: 3, label: 'Pubs' }
]

const clips: IProject[] = [
  { id: 1, title: 'La flamme', artist: 'Moha la squale', description: 'oui', image: 'cld-sample-5' },
  { id: 2, title: 'Dead 3x', artist: 'Pablo Moss', description: 'oui', image: 'cld-sample-4' },
  { id: 3, title: 'Caroline', artist: 'Lompemal', description: 'oui', image: 'cld-sample-1'}
]


interface IProject {
  id: number,
  title: string,
  artist: string,
  description: string,
  url?: string,
  camera?: string,
  image?: string
}

export default function Page() {
const [projects, setProjects] = useState<Array<IProject>>(clips);
const [isLoading, setLoader] = useState(false);
const [selectedTab, setSelectedTab] = useState(tabs[0]);
const [selectedTabId, setSelectedTabId] = useState(tabs[0].id | 0);

function updateBackgroundImage() {
  const windowHeight = window.innerHeight
    const elements: NodeListOf<HTMLElement>  = document.querySelectorAll(".thumbnail");
  
    const offset = -60;
  elements.forEach(element=>{
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
      {!isLoading && (
          <div
            key={selectedTab ? selectedTab.label : "empty"}
            className="w-full flex flex-col text-center mt-8"
          >
            {projects?.map((project, index) => (
              <motion.div 
              key={index} 
              className="w-[80%] mt-2 mx-auto "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <Project id={index.toString()} project={project} />
              </motion.div>
            ))}
          </div>
          )}
      </AnimatePresence>
    </main>
  )
}
function componentDidUpdate() {
  throw new Error("Function not implemented.");
}
