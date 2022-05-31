/** `actions` is a sequence that keeps the actions of the game's story in order */

type ActionTypes = "story" | "dialog" | "dialogAnswer";

export type Action = {
  name: string;
  type: ActionTypes;
};

const actions: Array<Action> = [
  {
    type: "story",
    name: "story1"
  },
  {
    type: "story",
    name: "story2"
  },
  {
    type: "dialog",
    name: "fight"
  },
  {
    type: "dialog",
    name: "username"
  },
  {
    type: "dialog",
    name: "usernick"
  },
  {
    type: "story",
    name: "story3"
  },
  {
    type: "story",
    name: "story4"
  },
  {
    type: "story",
    name: "story5"
  },
  {
    type: "story",
    name: "story6"
  },
  {
    type: "story",
    name: "story7"
  },
  {
    type: "story",
    name: "story8"
  },
  {
    type: "story",
    name: "story9"
  },
  {
    type: "story",
    name: "story10"
  },
  {
    type: "story",
    name: "story11"
  },
  {
    type: "story",
    name: "story12"
  },
  {
    type: "story",
    name: "story13"
  },
  {
    type: "story",
    name: "story14"
  },
  {
    type: "dialog",
    name: "fight"
  }
];

export default actions;
