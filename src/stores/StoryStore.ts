import create from "zustand";

import immer from "./immer";
import stories from "../data/stories";

import type { Story } from "../data/stories";

type StoryStore = {
  stories: Array<Story>;
  storyCount: number;
  getStoryByName: (name: string) => Story | undefined;
  increaseStoryCount: () => void;
  setStoryShown: (_id: number, hasShown: boolean) => void;
};

const useStoryStore = (set: any, get: any) => ({
  stories,
  storyCount: 0,
  getStoryByName: (name: string) => get().stories.find((story: Story) => story.name === name),
  increaseStoryCount: () =>
    set((state: StoryStore) => ({
      storyCount: state.storyCount + 1
    })),
  setStoryShown: (_id: number, hasShown: boolean) =>
    set((state: StoryStore) => {
      state.stories[_id].hasShown = hasShown;
    })
});

export default create<StoryStore>(immer(useStoryStore));
