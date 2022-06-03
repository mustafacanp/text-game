import create from "zustand";

import immer from "./immer";
import animations from "../data/animations/animations";

import type { Animation } from "../data/animations/animations";

type AnimationStore = {
  animations: Array<Animation>;
  animationCount: number;
  getAnimationByName: (name: string) => Animation | undefined;
  increaseAnimationCount: () => void;
  setAnimationShown: (_id: number, hasShown: boolean) => void;
};

const useAnimationStore = (set: any, get: any) => ({
  animations,
  animationCount: 0,
  getAnimationByName: (name: string) => get().animations.find((animation: Animation) => animation.name === name),
  increaseAnimationCount: () =>
    set((state: AnimationStore) => ({
      animationCount: state.animationCount + 1
    })),
  setAnimationShown: (_id: number, hasShown: boolean) =>
    set((state: AnimationStore) => {
      state.animations[_id].hasShown = hasShown;
    })
});

export default create<AnimationStore>(immer(useAnimationStore));
