import { useState, useEffect } from "react";
import useUIStore from "../stores/UIStore";
import useDialogStore from "../stores/DialogStore";
import useActionStore from "../stores/ActionStore";

import type { Dialog } from "../data/dialogs";

const useDialog = (): [React.Dispatch<React.SetStateAction<string>>, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [name, setName] = useState<string>("");
  const [dialog, setDialog] = useState<Dialog | null>(null);
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
    const dia: Dialog | undefined = dialogs.find((s) => s.name === name);
    if (!dia) {
      console.error(`ERROR! Dialog is missing with name ${name}.`);
      return;
    }
    setDialog(dia);
    addPrintedLine({ text: `${dia.question}`, skipSpaces: true, textSpeed: dia.textSpeed });
    setCinEnabled(true);
    setAction({ name, type: "dialogAnswer" });

    switch (dia.type) {
      case "text":
        break;
      case "choice":
        if (dia.choices) {
          for (const choice of dia.choices) {
            addPrintedLine({
              text: `${choice.id}. ${choice.text}`,
              type: "choice",
              skipSpaces: true,
              textSpeed: dia.textSpeed
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
    if (!dialog) {
      console.error(`ERROR! Dialog is missing with name ${name}.`);
      return;
    } else {
      switch (dialog.type) {
        case "text":
          if (promptText) {
            addPrintedLine({ text: promptText, type: "cin", textSpeed: dialog.textSpeed });
            if (dialog.output) addPrintedLine({ text: dialog.output, textSpeed: dialog.textSpeed });
            finishDialog(promptText);
          }
          break;
        case "choice":
          const choice = dialog.choices!.find((choice) => choice.id === promptText);
          if (choice) {
            addPrintedLine({ text: `${choice.text}`, type: "cin", textSpeed: dialog.textSpeed });
            finishDialog(choice.text);
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

  const finishDialog = (answer: string) => {
    if (dialog) {
      dialog.action && dialog.action();
      const index = dialogs.indexOf(dialog);
      setDialogShown(index, true);
      increaseDialogCount();
      increaseFinishedAction();
      addDialogueAnswer(dialog.question, answer);
      setCinEnabled(false);
    }
  };

  return [setName, setDialogAnswer];
};

export default useDialog;
