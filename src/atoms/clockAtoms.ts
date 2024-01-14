import { atom } from "jotai";

export const secondAtom = atom(0);
export const minuteAtom = atom(0);
export const hourAtom = atom(0);
export const tooltipPositionAtom = atom({ x: 0, y: 0 });
export const ampmAtom = atom("오전");