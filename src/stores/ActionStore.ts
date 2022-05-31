import create from "zustand";

import immer from "./immer";

import type { Action } from "../data/actions";

type ActionStore = {
  action: Action | null;
  actionType: string | null;
  finishedAction: number;
  dialogCount: number;
  storyCount: number;
  setAction: (action: Action | null) => void;
  increaseFinishedAction: () => void;
  increaseDialogCount: () => void;
  isStory: () => boolean;
  isDialog: () => boolean;
  isDialogAnswer: () => boolean;
};

const useActionStore = (set: any, get: any) => ({
  action: null,
  actionType: null,
  finishedAction: 0,
  dialogCount: 0,
  storyCount: 0,
  setAction: (action: Action | null) => set(() => ({ action })),
  increaseFinishedAction: () =>
    set((state: ActionStore) => ({
      finishedAction: state.finishedAction + 1
    })),
  increaseDialogCount: () =>
    set((state: ActionStore) => ({
      dialogCount: state.dialogCount + 1
    })),
  isStory: () => get().action?.type === "story",
  isDialog: () => get().action?.type === "dialog",
  isDialogAnswer: () => get().action?.type === "dialogAnswer"
});

export default create<ActionStore>(immer(useActionStore));
