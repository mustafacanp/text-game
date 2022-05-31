import ek from "../utils/ek";
import { fakeNick, badRace, goodRace, startingKingdom } from "../utils/constants";

export type Dialog = {
  name: string;
  type: "text" | "choice";
  hasShown: boolean;
  question: string;
  choices?: Array<Choice>;
  textSpeed?: number;
  output?: string;
  action?: (...params: any) => void;
};

type Choice = {
  id: string;
  text: string;
  textSpeed?: number;
  output?: string;
  action?: (...params: any) => void;
};

const dialogs: Array<Dialog> = [
  {
    name: "username",
    hasShown: false,
    type: "text",
    question: "Bu arada ben Terminal. Senin adın nedir?",
    action: (answer: string) => {
      // options.name = answer;
    }
  },
  {
    name: "usernick",
    hasShown: false,
    type: "text",
    question: "Peki sana nasıl hitap etmemi istersin? Lordum, yabancı, kanka ya da ne istersen.",
    output: `Tamam <span class='green'>${fakeNick}</span>. Neyse nerede kalmışık sana ${ek(
      startingKingdom,
      "e"
    )} anlatıyordum. ${ek(startingKingdom, "de")} yüzlerce yıl önce üç kadim ırk birlikte yaşardı. İnsanlar, ${ek(
      goodRace,
      "ler"
    )} ve ${ek(badRace, "ler")}.`,
    action: (answer: string) => {
      // options.nickName = answer;
    }
  },
  {
    name: "doYouLikeBeer",
    hasShown: false,
    type: "choice",
    question: "Do you like beer?",
    choices: [
      {
        id: "1",
        text: "Yes i like",
        output: "OK, man nice."
      },
      {
        id: "2",
        text: "I hate that shit.",
        output: "OK, calm down..."
      },
      {
        id: "3",
        text: "I love it!",
        output: "Wow maan... Take it and end this fucking game!"
      }
    ]
  },
  {
    name: "fight",
    hasShown: false,
    type: "choice",
    question: "Önünü kestiler savaşmak istiyor musun?",
    choices: [
      {
        id: "1",
        text: "Evet",
        output: "Hazırlıklarını bitir savaş başlıyor!",
        action: () => {
          // $("#container-info").css("display", "block");
          // const goblin = new Goblin();
          // startFight(goblin, 1);
        }
      },
      {
        id: "2",
        text: "Hayır",
        output: "Koşarak uzaklaştın...",
        action: () => {}
      }
    ]
  }
];

export default dialogs;
