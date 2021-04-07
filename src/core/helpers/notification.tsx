import { toast } from "react-toastify";

export const notification = (message: string) => {
  return toast(message, { closeButton: false });
};
