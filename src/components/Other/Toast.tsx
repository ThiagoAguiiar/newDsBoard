import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Toast(msg: string | null | undefined) {
  return toast(msg);
}
