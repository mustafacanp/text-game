import create from "zustand";

import stories from "../data/stories";

import type { Story } from "../data/stories";

type StoryStore = {
  stories: Array<Story>;
  storyCount: number;
  getStoryByName: (name: string) => Story | undefined;
  increaseStoryCount: () => void;
  setStoryShown: (_id: number, isShown: boolean) => void;
};

const useStore = create<StoryStore>((set, get) => ({
  stories,
  storyCount: 0,
  getStoryByName: (name: string) =>
    get().stories.find((story) => story.name === name),
  increaseStoryCount: () =>
    set((state) => ({
      storyCount: state.storyCount + 1,
    })),
  setStoryShown: (_id: number, isShown: boolean) =>
    set((state) => {
      return {
        stories: [
          ...state.stories,
          (state.stories[_id] = { ...state.stories[_id], isShown }),
        ],
      };
    }),
}));

export default useStore;
