import create from "zustand";

type ActionStore = {
  action: string | null;
  actionType: string | null;
  finishedAction: number;
  dialogueCount: number;
  storyCount: number;
  setAction: (action: string | null) => void;
  setActionType: (action: string | null) => void;
  increaseFinishedAction: () => void;
  increaseDialogueCount: () => void;
};

const useStore = create<ActionStore>((set) => ({
  action: null,
  actionType: null,
  finishedAction: 0,
  dialogueCount: 0,
  storyCount: 0,
  setAction: (action: string | null) => set(() => ({ action })),
  setActionType: (actionType: string | null) => set(() => ({ actionType })),
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
