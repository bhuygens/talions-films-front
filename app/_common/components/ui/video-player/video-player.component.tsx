"use client"
import ReactPlayer from "react-player/lazy"

type VideoPlayerProps = {
  videoUrl: string,
}
export default function VideoPlayerComponent({videoUrl}: VideoPlayerProps) {
  return <ReactPlayer url={videoUrl}
                      controls={true}
                      width={"100%"}
                      height={"100%"}
                      className={"react-player"}/>

}
