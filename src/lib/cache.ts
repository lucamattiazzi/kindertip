import { DIARY_KEY } from "./constants";
import { Diary } from "./types";

export function storeDiary(pages: Diary) {
  localStorage.setItem(DIARY_KEY, JSON.stringify(pages))
}

export function retrieveDiary(): Diary | null {
  const pages = localStorage.getItem(DIARY_KEY)
  if (!pages) return null
  return JSON.parse(pages)
}

export function clearDiary() {
  localStorage.removeItem(DIARY_KEY)
}