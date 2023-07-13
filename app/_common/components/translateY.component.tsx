import React, {useEffect, useRef} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import WindowUtil from "@/app/_common/utils/window.util";

type TranslateYComponentProps = {
  children: any,
  baseVelocity: number,
  damping?: number,
  stiffness?: number,
}

function HomeImagesColumnComponent({children, baseVelocity = 5, damping = 0, stiffness = 0}: TranslateYComponentProps) {

  let defaultVelocity = useRef(0);
  const baseY = useMotionValue(0);
  const {scrollY} = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {damping, stiffness});
  const velocityFactor = useTransform(smoothVelocity, [0, 200], [0, 5], {
    clamp: false,
  });
  const directionFactor = useRef<number>(1);


  const y = useTransform(baseY, (v) => `${wrap(-5, -150, v)}%`);

  // Store default base velocity to reapply it after hovering
  useEffect(() => {
    defaultVelocity.current = baseVelocity
  }, [])

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseY.set(baseY.get() + moveBy);
  });

  const reduceVelocity = () => {
    return defaultVelocity.current > 0 ? 1 : -1;
  }

  const hover = (e: MouseEvent) => {
    if (e.type === "pointerenter") {
      baseVelocity = reduceVelocity()
      if (WindowUtil.isHoverInTopTenOrLessTenPercentOfScreen(e)) baseVelocity = (baseVelocity - (baseVelocity * 2));
    } else {
      baseVelocity = defaultVelocity.current;
    }
  }

  return (
    <motion.div style={{y}} onHoverStart={hover} onHoverEnd={hover} className={"hover:cursor-pointer"}>
      {children}
    </motion.div>
  );
}

export default HomeImagesColumnComponent;
