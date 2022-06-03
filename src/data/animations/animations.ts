import StartingAnimation from "./StartingAnimation";

export type Animation = {
  name: string;
  component: () => React.ReactElement;
  duration: number; // milliseconds
  hasShown: boolean;
  action?: (...params: any) => void;
};

const stories: Array<Animation> = [
  {
    name: "starting",
    hasShown: false,
    duration: 20000,
    component: StartingAnimation
  }
];

export default stories;
