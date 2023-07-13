import React, {useEffect} from "react";
import {motion, useAnimate} from "framer-motion";
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";
import {Tabs} from "@/app/_common/domain/enums/config.enum";
import {useRouter} from "next/navigation";


function TabsComponent() {
  const [scope, animate] = useAnimate()
  const {onTabClicked, currentTab, brandPosition} = useHeaderContext();
  const router = useRouter()


  useEffect(() => {
    animate(scope.current, {opacity: 1}, {duration: 2, delay: (currentTab === "home" ? 0 : 1)})
  }, [animate, scope])

  useEffect(() => {
    if (brandPosition === "middle") {
      moveTabsToCenter();
    }
  }, [brandPosition])

  const moveTabsToTop = () => {
    animate(scope.current, {top: "10px"}, {duration: 0.5})
  }

  const moveTabsToCenter = () => {
    animate((scope.current), {
      fontSize: "6rem",
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "66%",
    }, {duration: 0.5})
  }
  const handleTabClicked = (e: any) => {
    moveTabsToTop();
    onTabClicked(e.target.value);
    router.push(`/${e.target.value}`)
  }

  const isSelectedTab = (tab: string) => {
    return currentTab === tab;
  }
  const generateTabs = () => {
    return Object.values(Tabs).map((tab, key) =>
      <button key={key}
              className={`text-green-800 text-4xl cursor-pointer font-kenyan-coffee neon-shadow mr-10 ${isSelectedTab(tab) && "underline"}`}
              onClick={handleTabClicked} value={tab}>
        {tab}
      </button>,
    )
  }

  return (
    <>
      {brandPosition === "middle" ?
        <motion.div
          className={"flex justify-evenly top-1/2 left-1/2 absolute -translate-x-1/2 translate-y-full opacity-0 z-10"}
          ref={scope}
        >
          {generateTabs()}
        </motion.div> :
        <motion.div
          className={"opacity-0 flex justify-evenly left-1/2 absolute -translate-x-1/2 z-10"}
          style={{top: "10px"}}
          ref={scope}
        >
          {generateTabs()}
        </motion.div>
      }
    </>
  )
}

export default TabsComponent;
