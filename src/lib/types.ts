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
  cDate: string
  course?: string
  subposts: SubPost[]
}

export interface Food {
  course: string
  name: string
  quantity: number
}

export interface RawDiaryPage {
  posts: Post[]
  kid: Kid
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
  avg: number
  weightedRating: number
}
