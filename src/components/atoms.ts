import { atom } from "jotai";

export const clockAtom = atom(new Date());

export const handsAtom = atom({
  hour: 0,
  minute: 0,
  second: 0,
});

export const tooltipAtom = atom({
  content: "",
  top: 0,
  right: 0,
});
