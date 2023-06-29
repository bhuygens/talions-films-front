"use client"

import {useEffect, useRef, useState} from "react";
import styles from "./custom-cursor.module.css";
import {useMousePosition} from "@/app/_common/components/ui/cursor/mouse-position";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const container = useRef<any>();
  const mousePosition = useMousePosition();

  const img = useRef<any>();
  useEffect(() => {
    if (cursorRef.current == null) return;

    document.addEventListener("mousemove", handleMouseMove);

  }, []);


  const handleMouseMove = (e: MouseEvent) => {
    cursorRef.current!.style.top = e.pageY + "px";
    cursorRef.current!.style.left = e.pageX + "px";
    draw(e.pageX, e.pageY);
  };

  const draw = (x: any, y: any) => {
      const div = document.createElement("div");
      div.classList.add(styles["trailing"]);
      div.style.top = y + "px";
      div.style.left = x + "px";
      container.current.append(div);


    if (container.current.childNodes.length > 20) {
      erase();
    } else {
      setTimeout(() => {
        erase();
      }, 200)
    }
  }

  const erase = () => {
    container.current.removeChild(container.current.childNodes[1])
  }

  return (
    <>
      <div ref={container} className={styles.container}>
        <div className={styles.cursor} ref={cursorRef}>
        </div>
      </div>
    </>
  );
}
