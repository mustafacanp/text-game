import create from "zustand";

type ActionStore = {
  action: string | null;
  finishedAction: number;
  dialogueCount: number;
  storyCount: number;
  updateAction: (action: string | null) => void;
  increaseFinishedAction: () => void;
  increaseDialogueCount: () => void;
};

const useStore = create<ActionStore>((set) => ({
  action: null,
  finishedAction: 0,
  dialogueCount: 0,
  storyCount: 0,
  updateAction: (action: string | null) => set(() => ({ action })),
  increaseFinishedAction: () =>
    set((state) => ({
      finishedAction: state.finishedAction + 1
    })),
  increaseDialogueCount: () =>
    set((state) => ({
      dialogueCount: state.dialogueCount + 1
    }))
}));

export default useStore;
