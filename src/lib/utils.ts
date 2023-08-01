import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDay() === d2.getDay()
  );
}

export const displayJam = (value: string) => {
  const jam = value.split("jam").join("").split("_").map(v => `${v}.00`).join("-");
  return `Jam ${jam}`;
};

export const delay = (delayInms : number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
