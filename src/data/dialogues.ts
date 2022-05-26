import ek from "../utils/ek";
import {
  fakeNick,
  badRace,
  goodRace,
  startingKingdom,
} from "../utils/constants";

const dialogues = {
  username: {
    id: 1,
    type: "text",
    question: "Bu arada ben Terminal. Senin adın nedir?",
    printText: (input: string) => {
      return "<span class='green'>" + input + "</span>";
    },
    saveAnswer: (answer: string) => {
      // dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
      // options.name = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
    },
  },
  usernick: {
    id: 2,
    type: "text",
    question:
      "Peki sana nasıl hitap etmemi istersin? Lordum, yabancı, kanka ya da ne istersen.",
    printText: () => {
      return (
        "Tamam <span class='green'>" +
        fakeNick +
        "</span>. Neyse nerede kalmışık sana " +
        ek(startingKingdom, "e") +
        " anlatıyordum. " +
        ek(startingKingdom, "de") +
        " yüzlerce yıl önce üç kadim ırk birlikte yaşardı. İnsanlar, " +
        ek(goodRace, "ler") +
        " ve " +
        ek(badRace, "ler") +
        "."
      );
    },
    saveAnswer: (answer: string) => {
      // dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
      // options.nickName = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
    },
  },
  doYouLikeBeer: {
    id: 3,
    type: "number",
    question: "Do you like beer?",
    answers: [
      {
        id: 1,
        inputText: "Yes i like",
        saveAnswer: (keyName: string) => {
          // dialogueAnswers[keyName] = this.inputText;
          // return "OK, man nice.";
        },
      },
      {
        id: 2,
        inputText: "I hate that shit.",
        saveAnswer: (keyName: string) => {
          // dialogueAnswers[keyName] = this.inputText;
          // return "OK man, calm down..";
        },
      },
      {
        id: 3,
        inputText: "I love it!",
        saveAnswer: (keyName: string) => {
          // dialogueAnswers[keyName] = this.inputText;
          // return "Wow maan... Take it and end this fucking game!";
        },
      },
    ],
  },
  fight: {
    id: 4,
    type: "number",
    question: "Önünü kestiler savaşmak istiyor musun?",
    answers: [
      {
        id: 1,
        inputText: "Evet",
        saveAnswer: (keyName: string) => {
          // dialogueAnswers[keyName] = this.inputText;
          // return "Hazırlıklarını bitir savaş başlıyor!";
        },
        action: (keyName: string) => {
          // $("#container-info").css("display", "block"); // TODO: #container-info göster
          // const goblin = new Goblin();
          // startFight(goblin, 1);
        },
      },
      {
        id: 2,
        inputText: "Hayır",
        saveAnswer: (keyName: string) => {
          // dialogueAnswers[keyName] = this.inputText;
          // return "Koşarak uzaklaştın...";
        },
        action: (keyName: string) => {},
      },
    ],
  },
};

export default dialogues;
