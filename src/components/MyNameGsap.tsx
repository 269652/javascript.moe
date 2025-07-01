// MyNameGSAP.tsx
import { useRef, useContext, useEffect } from "react";
import { sectionCtx } from "@/components/AnimatedSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MyNameGSAP = () => {
  const container = useContext(sectionCtx).ref;
  const root = useRef<HTMLDivElement>(null);
  const letterM = useRef<HTMLSpanElement>(null);
  const letterOe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container!.current,
        start: "top top",
        end: "bottom+=200 top",
        scrub: true,
        onUpdate: (self) => {
          // Example dynamic distance for centering 'M' and 'oe'
          if (!letterM.current || !letterOe.current) return;
          const mr = letterM.current.getBoundingClientRect(),
            or = letterOe.current.getBoundingClientRect(),
            w = window.innerWidth;
          const dM = w / 2 - mr.left - mr.width,
            dO = w / 2 - or.left;
          gsap.set(letterM.current, { x: dM });
          gsap.set(letterOe.current, { x: dO });
        },
      },
    });

    tl.to(root.current, { opacity: 0.1, duration: 1 }, 0)
      .to(letterM.current, { scaleX: 1.3 }, 0)
      .to(letterOe.current, { scaleX: 1.3 }, 0)
      .to(
        root.current.querySelector(".pipe"),
        { height: "60vh", width: "200px", duration: 0.5 },
        0.5
      )
      .to(
        root.current.querySelector(".pipe"),
        {
          boxShadow: "0 0 1px .5px #C0C0C0",
          background: "rgba(255,255,255,0)",
          duration: 0.5,
        },
        0.8
      );

    return () => ScrollTrigger.killAll();
  }, [container]);

  return (
    <div
      ref={root}
      className="absolute bottom-0 w-full flex justify-center items-center text-center"
    >
      <span ref={letterM} className="inline-block">
        M<span className="pipe bg-white h-1 inline-block"></span>
      </span>
      <span>oritz R</span>
      <span ref={letterOe} className="inline-block">
        oe
      </span>
      <span>ssler</span>
    </div>
  );
};
