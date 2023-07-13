import React, {useEffect} from "react";
import {motion, useAnimate} from "framer-motion";
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";
import {useRouter} from "next/navigation";
import NavbarPositionComponent from "@/app/_common/components/layout/navbar-position.component";

function BrandComponent() {
  const [brandTextPosition, animateBrandTextPosition] = useAnimate();
  const {currentTab, brandPosition, setCurrentTab} = useHeaderContext();
  const router = useRouter();


  useEffect(() => {
    if (currentTab !== "home" && brandPosition === "top") {
      moveBrandToTopLeftCorner()
    }
  }, [currentTab])


  const moveBrandToTopLeftCorner = () => {
    animateBrandTextPosition(brandTextPosition.current, {
      top: "0px",
      left: "0px",
      translateX: "0%",
      translateY: "0%",
      fontSize: "48px",
    }, {duration: 0.5});
  }

  const moveBrandToCenter = () => {
    animateBrandTextPosition((brandTextPosition.current), {
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "-66%",
      fontSize: "6rem",
    })
    router.push("/");
  }
  const handleLogoClick = () => {
    if (currentTab !== "" && currentTab !== "home") {
      moveBrandToCenter()
      setCurrentTab("home");
    }
  }


  return (
    <>
      {currentTab !== "home" && <NavbarPositionComponent/>}
      <motion.a
        initial="hidden"
        animate="visible"
        exit={{opacity: 0, transition: {duration: 0.5}}}
        className={"absolute z-10 cursor-pointer"}
        ref={brandTextPosition} onClick={handleLogoClick}
        style={{fontSize: "6rem", translateX: "-50%", translateY: "-66%", top: "50%", left: "50%"}}

      >
        <div className={"flex flex-row"}>
          <motion.div
            className={"whitespace-nonwrap font-akira mr-10 tracking-wide"}
            variants={{
              hidden: {opacity: 0, y: -500},
              visible: {opacity: 1, y: 0, transition: {duration: 2}},
            }}
          >
            <span className={"letter-shadow mr-0.5"}>T</span>
            <span className={"letter-shadow"}>a</span>
            <span className={"letter-shadow"}>l</span>
            <span className={"letter-shadow"}>i</span>
            <span className={"letter-shadow"}>o</span>
            <span className={"letter-shadow"}>n</span>
          </motion.div>

          <motion.div
            className={"whitespace-nowrap font-akira"}
            variants={{
              hidden: {opacity: 0, y: 500},
              visible: {opacity: 1, y: 0, transition: {duration: 2}},
            }}>
            <span className={"letter-shadow"}>F</span>
            <span className={"letter-shadow"}>i</span>
            <span className={"letter-shadow"}>l</span>
            <span className={"letter-shadow"}>m</span>
            <span className={"letter-shadow"}>s</span>
          </motion.div>
        </div>
      </motion.a>
    </>
  );
}

export default BrandComponent;
