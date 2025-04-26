"use client";

import { MotionValue, useTransform } from "framer-motion";
import { useEffect, useState, RefObject } from "react";

export const useParallax = (
  value: MotionValue<number>,
  distance: number,
  offset: number,
  ease?: (t: number) => number,
  range?: [number, number]
) => {
  return useTransform(
    value,
    range || [1, 0],
    [-distance - offset, distance - offset],
    {
      ease,
    }
  );
};

export function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    // Set initial hash
    setHash(window.location.hash);

    // Update hash on hashchange
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    // Clean up event listener
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

/**
 * useWindowWidth
 * Returns the current window width (or undefined on SSR).
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(1024);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

/**
 * useWindowWidth
 * Returns the current window width (or undefined on SSR).
 */
export function useWindowHeight(): number {
  const [height, setHeight] = useState<number>(788);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setHeight(window.innerHeight);
    }

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (e: React.MouseEvent) => void,
  active = true,
  event = "mouseup"
) => {
  useEffect(
    () => {
      const listener = (event: React.MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements

        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return true;
        }
        if (active) {
          return handler(event);
        }
        return true;
      };

      if (active) {
        document.addEventListener(event, listener as any);
      }

      return () => {
        if (active) {
          document.removeEventListener(event, listener as any);
        }
      };
    },

    /*
     * Add ref and handler to effect dependencies
     * It's worth noting that because passed in handler is a new ...
     * ... function on every render that will cause this effect ...
     * ... callback/cleanup to run every render. It's not a big deal ...
     * ... but to optimize you can wrap handler in useCallback before ...
     * ... passing it into this hook.
     */
    [ref, handler, active]
  );
};

export function useBody(): HTMLBodyElement | null {
  const [body, setBody] = useState<HTMLBodyElement | null>(null);

  useEffect(() => {
    setBody(document.body as HTMLBodyElement);
  }, []);

  return body;
}

// export default useOnClickOutside;
