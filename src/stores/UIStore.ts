import create from "zustand";

import immer from "./immer";

import type { Print } from "../components/Line/Line";

type Character = {};

type UIStore = {
  promptText: string;
  printedLines: Array<{ type: Print; text: string; textSpeed?: number }>;
  commandHistory: Array<string>;
  mainCharacter: Character | null;
  isMenuActive: boolean;
  textSpeed: number;
  cinEnabled: boolean;
  isTerminalSpeaking: boolean;
  is_animating: boolean;
  is_fighting: boolean;
  setPromptText: (text: string) => void;
  addCommandHistory: (text: string) => void;
  setIsTerminalSpeaking: (isTerminalSpeaking: boolean) => void;
  setCinEnabled: (isTerminalSpeaking: boolean) => void;
  addPrintedLine: ({
    text,
    type,
    skipSpaces,
    textSpeed
  }: {
    text: string;
    type?: string;
    skipSpaces?: boolean;
    textSpeed?: number;
  }) => void;
};

const useUIStore = (set: any) => ({
  promptText: "",
  printedLines: [],
  commandHistory: [],
  mainCharacter: null,
  isMenuActive: false,
  textSpeed: 20, // Text writing speed (ms per letter)
  isTerminalSpeaking: false,
  cinEnabled: false,
  is_animating: false,
  is_fighting: false,
  setPromptText: (promptText: string) => set(() => ({ promptText })),
  addCommandHistory: (text: string) =>
    set((state: UIStore) => {
      if (text) {
        state.commandHistory.push(text);
      }
    }),
  setIsTerminalSpeaking: (isTerminalSpeaking: boolean) => set(() => ({ isTerminalSpeaking })),
  setCinEnabled: (cinEnabled: boolean) => set(() => ({ cinEnabled })),
  addPrintedLine: ({
    text,
    type = "cout",
    skipSpaces = false,
    textSpeed
  }: {
    text: string;
    type?: Print;
    skipSpaces?: boolean;
    textSpeed?: number;
  }) =>
    set((state: UIStore) => {
      if (type === "cin" && text) {
        state.commandHistory.push(state.promptText);
        state.promptText = "";
      }

      const _text = `${removeSpaces(text)}${!skipSpaces ? "<br/><br/>" : ""}`;
      state.printedLines = [...state.printedLines, { type, text: _text, textSpeed: textSpeed || state.textSpeed }];
    })
});

const removeSpaces = (s: string): string => s.replace(/\s+/g, " ").trim();

export default create<UIStore>(immer(useUIStore));
