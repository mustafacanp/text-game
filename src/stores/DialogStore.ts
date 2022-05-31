import create from "zustand";

import immer from "./immer";
import dialogs from "../data/dialogs";

import type { Dialog } from "../data/dialogs";

type DialogStore = {
  dialogs: Array<Dialog>;
  dialogCount: number;
  dialogueAnswers: Array<{ question: string; answer: string }>;
  getDialogByName: (name: string) => Dialog | undefined;
  increaseDialogCount: () => void;
  setDialogShown: (index: number, hasShown: boolean) => void;
  addDialogueAnswer: (question: string, answer: string) => void;
};

const useDialogStore = (set: any, get: any) => ({
  dialogs,
  dialogCount: 0,
  dialogueAnswers: [],
  getDialogByName: (name: string) => get().dialogs.find((dialog: Dialog) => dialog.name === name),
  increaseDialogCount: () =>
    set((state: DialogStore) => ({
      dialogCount: state.dialogCount + 1
    })),
  setDialogShown: (index: number, hasShown: boolean) =>
    set((state: DialogStore) => {
      state.dialogs[index].hasShown = hasShown;
    }),
  addDialogueAnswer: (question: string, answer: string) =>
    set((state: DialogStore) => {
      state.dialogueAnswers = [...state.dialogueAnswers, { question, answer }];
    })
});

export default create<DialogStore>(immer(useDialogStore));
