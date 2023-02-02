import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FirebaseResponseType = {
  msg: string;
  response: string;
};

export function Toast(
  responseFirebase: FirebaseResponseType,
  options: ToastOptions
) {
  const { response, msg } = responseFirebase;

  if (response === "Ok") return toast.success(msg, options);
  else return toast.error(msg, options);
}
