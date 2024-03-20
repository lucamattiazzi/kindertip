export interface Auth {
  token: string
  id: string
}

export interface Kid {
  birthDate: string
  gender: string
  name: string
  lastName: string
  id: string
}

interface SubPost {
  name: string
  kid: {
    qty: {
      n: number
      text: string
    }
  }
}

interface Post {
  course?: string
  name: string
  subposts: SubPost[]
}

export interface Food {
  course: string
  name: string
  quantity: number
  text: string
}

export interface RawDiaryPage {
  posts: Post[]
  kid: Kid
  date: string
}

export interface DiaryPage {
  food: Food[]
  date: string
}

export interface Diary {
  pages: DiaryPage[]
  kid: Kid
  auth: Auth
}

export interface FoodRating {
  name: string
  votes: number[]
  dates: string[]
  avg: number
  weightedRating: number
}

export interface RendererProps<T> {
  value: T
}

export type AdvancementFn = (perc: number) => void