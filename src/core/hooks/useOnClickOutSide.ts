import { MutableRefObject, useEffect } from "react";
import { BURGER_ID } from "../../components/ui/MenuButton";

export const useOnClickOutside = (
  ref: MutableRefObject<HTMLDivElement | null>,
  handler: () => void,
  disabled: boolean
) => {
  useEffect(() => {
    const listener: EventListener = (e) => {
      if (
        !e.target ||
        !ref.current ||
        ref.current.contains(e.target as Node) ||
        (e.target as Element).id === BURGER_ID
      ) {
        return;
      }

      handler();
    };

    if (!disabled) {
      document.addEventListener("click", listener, false);
    }

    return () => {
      document.removeEventListener("click", listener, false);
    };
  }, [ref, handler, disabled]);
};
