import React, {useEffect} from "react";
import {motion, useAnimate} from "framer-motion";
import {useHeaderContext} from "@/app/_common/domain/contexts/header/header.context";
import {useRouter} from "next/navigation";
import NavbarPositionComponent from "@/app/_common/components/layout/navbar-position.component";

function BrandComponent() {
  const [scope, animate] = useAnimate()
  const [fontSizing, animateSizing] = useAnimate()
  const {currentTab, brandPosition, setBrandPosition} = useHeaderContext();
  const router = useRouter();

  useEffect(() => {
    smoothDisplayBrand();
  }, [animate, scope])

  useEffect(() => {
    if (currentTab !== "home" && brandPosition === "top" && window.location.pathname === "/") {
      moveBrandToTopLeftCorner()
    } else {
      moveBrandToCenter();
    }
  }, [currentTab])


  const moveBrandToTopLeftCorner = () => {
    animate(scope.current, {
      top: "0px",
      left: "0px",
      fontSize: "48px",
      translateX: "0%",
      translateY: "0%",
    }, {duration: 2});
    animateSizing(fontSizing.current, {fontSize: "48px", top: "0"}, {duration: 2});
  }

  const moveBrandToCenter = () => {
    setBrandPosition("middle");
    animate((scope.current), {
      fontSize: "6rem",
      top: "50%",
      left: "50%",
      translateX: "-50%",
      translateY: "-66%",
    })
    router.push("/");
  }

  const smoothDisplayBrand = () => {
    animate(scope.current, {opacity: 1}, {duration: 3, delay: 2})
  }

  const handleLogoClick = () => {
    if (currentTab !== "" && currentTab !== "home") {
      moveBrandToCenter()
    }
  }


  return (
    <>
      {(currentTab !== "home" && window.location.pathname !== '/') && <NavbarPositionComponent/>}
      {window.location.pathname === "/" ?
        <motion.a
          initial="hidden"
          animate="visible"
          exit={{opacity: 0, transition: {duration: 2}}}
          className={"absolute   z-10 cursor-pointer"}
          ref={scope} onClick={handleLogoClick}
          style={{fontSize: "6rem", translateX: "-50%", translateY: "-66%", top: "50%", left: "50%"}}

        >
          <div className={"flex flex-row"} ref={fontSizing}>
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
        </motion.a> :
        <motion.a
          initial="hidden"
          animate="visible"
          exit={{opacity: 0, transition: {duration: 2}}}
          className={"absolute z-10 cursor-pointer font-akira whitespace-nowrap tracking-wide top-0"}
          ref={scope} onClick={handleLogoClick}
          style={{fontSize: "48px"}}>
          <span className={"letter-shadow mr-0.5"}>T</span>
          <span className={"letter-shadow"}>a</span>
          <span className={"letter-shadow"}>l</span>
          <span className={"letter-shadow"}>i</span>
          <span className={"letter-shadow"}>o</span>
          <span className={"letter-shadow mr-10"}>n</span>
          <span className={"letter-shadow"}>F</span>
          <span className={"letter-shadow"}>i</span>
          <span className={"letter-shadow"}>l</span>
          <span className={"letter-shadow"}>m</span>
          <span className={"letter-shadow"}>s</span>
        </motion.a>
      }
    </>
  );
}

export default BrandComponent;
