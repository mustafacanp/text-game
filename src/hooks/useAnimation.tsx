import { useState, useEffect } from "react";
import useAnimationStore from "../stores/AnimationStore";
import useActionStore from "../stores/ActionStore";

import type { Animation } from "../data/animations/animations";

const useAnimation = (): [React.Dispatch<React.SetStateAction<string>>, boolean, () => React.ReactElement | null] => {
  const [name, setName] = useState<string>("");
  const [animation, setAnimation] = useState<Animation | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  // ActionStore
  const increaseFinishedAction = useActionStore((state) => state.increaseFinishedAction);
  // StoryStore
  const animations = useAnimationStore((state) => state.animations);
  const increaseAnimationCount = useAnimationStore((state) => state.increaseAnimationCount);
  const setAnimationShown = useAnimationStore((state) => state.setAnimationShown);

  useEffect(() => {
    if (!name) return;
    const anim: Animation | undefined = animations.find((a) => a.name === name);
    if (!anim) {
      console.error(`ERROR! Animation is missing with name ${name}.`);
      return;
    }
    setAnimation(anim);
    animate(anim.duration);

    const index = animations.indexOf(anim);
    setAnimationShown(index, true);
    increaseAnimationCount();
    increaseFinishedAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const animate = (timeout: number) => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, timeout);
    return;
  };

  const renderAnimation = (): React.ReactElement | null => {
    return animation ? <animation.component /> : null;
  };

  return [setName, showAnimation, renderAnimation];
};

export default useAnimation;
