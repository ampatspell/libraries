import { innerHeight as _innerHeight, innerWidth as _innerWidth, scrollY } from 'svelte/reactivity/window';
import { getter, options } from './options.js';

export type ReactiveValue<T> = {
  readonly current: T;
};

export const createReactiveValueWithFallback = <T>(value: ReactiveValue<T | undefined>, fallback: T) => {
  return options({
    fallback,
    current: getter(() => value.current ?? fallback),
  });
};

export const createInnerWith = (fallback: number) => {
  return createReactiveValueWithFallback(_innerWidth, fallback);
};

export const createInnerHeight = (fallback: number) => {
  return createReactiveValueWithFallback(_innerHeight, fallback);
};

export const createOpacity = (max = 300) => {
  return options({
    current: getter(() => {
      const y = Math.min(scrollY.current ?? 0, max);
      return 1 - y / max;
    }),
  });
};
