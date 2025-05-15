// context.ts
import { cache } from "react";

/**
 * This is a workaround until Next.js adds support for true Server Context
 * It works by using React `cache` to store the value for the lifetime of one rendering.
 * Meaning it's available to all server components down the tree after it's set.
 * Do not use this unless necessary.
 *
 * @warning This is a temporary workaround.
 */
export function createServerContext<T>(
  defaultValue: T
): [() => T, (v: T) => void] {
  const getRef = cache(() => ({ current: defaultValue }));

  const getValue = (): T => getRef().current;

  const setValue = (value: T) => {
    getRef().current = value;
  };

  return [getValue, setValue];
}
export const [getNotFoundContext, setNotFoundContext] = createServerContext<{
  locale: string;
  slug: string;
} | null>(null);
