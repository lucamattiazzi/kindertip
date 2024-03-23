import { atom } from 'jotai'
import { getDiary } from '../lib/apiUtils'
import { clearDiary, retrieveDiary, storeDiary } from '../lib/cache'
import { Diary } from '../lib/types'
import { getBestFoods } from '../lib/utils'

const cachedDiary = retrieveDiary()
const _diaryAtom = atom<Diary | null>(cachedDiary)

export const diaryAtom = atom(
  (get) => get(_diaryAtom),
  (_, set, newDiary: Diary | null) => {
    set(_diaryAtom, newDiary)
    newDiary ? storeDiary(newDiary) : clearDiary()
  },
)

diaryAtom.onMount = (set) => {
  const cachedDiary = retrieveDiary()
  if (!cachedDiary) return
  getDiary(cachedDiary!.auth, cachedDiary!).then(set)
}

export const isLoggedAtom = atom(get => !!get(diaryAtom))

export const bestFoodsAtom = atom(get => get(diaryAtom) ? getBestFoods(get(diaryAtom)!) : [])


export function logout() {
  clearDiary()
  window.location.reload()
}

const _infoAtom = atom(false)
export const infoAtom = atom(
  (get) => get(_infoAtom),
  (_, set, newValue: boolean) => set(_infoAtom, newValue)
)