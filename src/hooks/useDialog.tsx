import { useState, useEffect } from "react";
import useUIStore from "../stores/UIStore";
import useDialogStore from "../stores/DialogStore";
import useActionStore from "../stores/ActionStore";

import type { Dialog as DialogType } from "../data/dialogs";

const Dialog = (): [React.Dispatch<React.SetStateAction<string>>, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [name, setName] = useState<string>("");
  const [dialogAnswer, setDialogAnswer] = useState<boolean>(false);

  // UIStore
  const promptText = useUIStore((state) => state.promptText);
  const addPrintedLine = useUIStore((state) => state.addPrintedLine);
  const setCinEnabled = useUIStore((state) => state.setCinEnabled);
  // ActionStore
  const setAction = useActionStore((state) => state.setAction);
  const increaseFinishedAction = useActionStore((state) => state.increaseFinishedAction);
  // DialogStore
  const dialogs = useDialogStore((state) => state.dialogs);
  const increaseDialogCount = useDialogStore((state) => state.increaseDialogCount);
  const setDialogShown = useDialogStore((state) => state.setDialogShown);
  const addDialogueAnswer = useDialogStore((state) => state.addDialogueAnswer);

  useEffect(() => {
    if (!name) return;
    const dialog: DialogType | undefined = dialogs.find((s) => s.name === name);
    if (!dialog) {
      console.error(`ERROR! Dialog is missing with name ${name}.`);
      return;
    }
    addPrintedLine({ text: `${dialog.question}`, skipSpaces: true, textSpeed: dialog.textSpeed });
    setCinEnabled(true);
    setAction({ name, type: "dialogAnswer" });

    switch (dialog.type) {
      case "text":
        break;
      case "choice":
        if (dialog.choices) {
          for (const choice of dialog.choices) {
            addPrintedLine({
              text: `${choice.id}. ${choice.text}`,
              type: "choice",
              skipSpaces: true,
              textSpeed: dialog.textSpeed
            });
          }
        }
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (!dialogAnswer) return;
    const dialog: DialogType | undefined = dialogs.find((s) => s.name === name);
    if (!dialog) {
      console.error(`ERROR! Dialog is missing with name ${name}.`);
      return;
    } else {
      switch (dialog.type) {
        case "text":
          if (promptText) {
            addPrintedLine({ text: promptText, type: "cin", textSpeed: dialog.textSpeed });
            if (dialog.output) addPrintedLine({ text: dialog.output, textSpeed: dialog.textSpeed });
            finishDialog(dialog, promptText);
          }
          break;
        case "choice":
          const choice = dialog.choices!.find((choice) => choice.id === promptText);
          if (choice) {
            addPrintedLine({ text: `${choice.text}`, type: "cin", textSpeed: dialog.textSpeed });
            finishDialog(dialog, choice.text);
          } else {
            // addShakeClass();
          }
          break;

        default:
          // addShakeClass();
          break;
      }
    }
    setDialogAnswer(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogAnswer]);

  const finishDialog = (dialog: DialogType, answer: string) => {
    dialog.action && dialog.action();
    const index = dialogs.indexOf(dialog);
    setDialogShown(index, true);
    increaseDialogCount();
    increaseFinishedAction();
    addDialogueAnswer(dialog.question, answer);
    setCinEnabled(false);
  };

  return [setName, setDialogAnswer];
};

export default Dialog;
