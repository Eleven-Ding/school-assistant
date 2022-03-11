import { SHOW_MASK } from "./constant";

export function changeMaskType(bool) {
  return {
    type: SHOW_MASK,
    payload: bool,
  };
}
