import create from "zustand";

type Character = {};

type UIStore = {
  mainCharacter: Character | null;
  isMenuActive: boolean;
  textSpeed: number;
  current_dialogue_name: string;
  cinEnabled: boolean;
  isTerminalSpeaking: boolean;
  is_animating: boolean;
  is_fighting: boolean;
  setIsTerminalSpeaking: (isTerminalSpeaking: boolean) => void;
  setCinEnabled: (isTerminalSpeaking: boolean) => void;
};

const useStore = create<UIStore>((set) => ({
  mainCharacter: null,
  isMenuActive: false,
  textSpeed: 30, // Text writing speed (ms per letter)
  current_dialogue_name: "", // action() içinde, action_type = "dialogue_answer" devam ediyor ise hangi diyaloğa cevap vereceğini tutuyor.
  isTerminalSpeaking: false,
  cinEnabled: false,
  is_animating: false,
  is_fighting: false,
  setIsTerminalSpeaking: (isTerminalSpeaking: boolean) =>
    set(() => ({
      isTerminalSpeaking
    })),
  setCinEnabled: (cinEnabled: boolean) =>
    set(() => ({
      cinEnabled
    }))
}));

export default useStore;
