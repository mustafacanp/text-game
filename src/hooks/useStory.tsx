import { useState, useEffect } from "react";
import useUIStore from "../stores/UIStore";
import useStoryStore from "../stores/StoryStore";
import useActionStore from "../stores/ActionStore";

const Story = (): React.Dispatch<React.SetStateAction<string>> => {
  const [name, setName] = useState<string>("");

  // UIStore
  const addPrintedLine = useUIStore((state) => state.addPrintedLine);
  // ActionStore
  const increaseFinishedAction = useActionStore((state) => state.increaseFinishedAction);
  // StoryStore
  const stories = useStoryStore((state) => state.stories);
  const increaseStoryCount = useStoryStore((state) => state.increaseStoryCount);
  const setStoryShown = useStoryStore((state) => state.setStoryShown);

  useEffect(() => {
    if (!name) return;
    const story = stories.find((s) => s.name === name);
    if (!story) {
      console.error(`ERROR! Story is missing with name ${name}.`);
      return;
    }
    addPrintedLine({ text: story.text, textSpeed: story.textSpeed });

    const index = stories.indexOf(story);
    setStoryShown(index, true);
    increaseStoryCount();
    increaseFinishedAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return setName;
};

export default Story;
