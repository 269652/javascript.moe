"use client";

import clsx from "clsx";

export type VideoProps = {
  className?: string;
  src: string;
  inline: boolean;
};
export const Video = (props: VideoProps) => {
  const { className, src, inline } = props;
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      className={clsx("object-cover", {
        "w-screen h-screen  z-0 top-0 sticky": !inline,
        "w-full h-full relative": inline,
      })}
      onClick={(e) => {
        const vid = e.target as HTMLVideoElement;
        if (vid.paused) vid.play();
        else vid.pause();
      }}
    />
  );
};
