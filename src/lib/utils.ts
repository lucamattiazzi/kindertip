import { groupBy, mean, sortBy } from "lodash-es"
import { weekNumber } from "weeknumber"
import { Diary, DiaryPage, FoodRating, Kid, RawDiaryPage } from "./types"

const COMMON_FOODS_CONSTANT = 3
const MINUMUM_VOTES = 1

export const quantityToVote = (quantity: number) => [10, 7, 3, 0][quantity - 1]

export function getBestFoods(diary: Diary): FoodRating[] {
  const foods = diary.pages.flatMap(p => p.food.map(f => ({ ...f, date: p.date })))
  const grouped = groupBy(foods, f => f.name)
  const allVotes = Object.entries(grouped).map(([k, v]) => ({ name: k, votes: v.map(f => quantityToVote(f.quantity)), dates: v.map(f => f.date) }))
  const filteredVotes = allVotes.filter(v => v.votes.length > MINUMUM_VOTES)
  const totalAvg = mean(filteredVotes.flatMap(v => v.votes))
  const votesWithAvgs = filteredVotes.map(v => ({ ...v, avg: mean(v.votes) }))
  const weightedRatings = votesWithAvgs.map(v => {
    const votesPart = v.votes.length / (v.votes.length + COMMON_FOODS_CONSTANT) * v.avg
    const populationPart = COMMON_FOODS_CONSTANT / (v.votes.length + COMMON_FOODS_CONSTANT) * totalAvg
    return { ...v, weightedRating: votesPart + populationPart }
  })
  const sortedWeightedRatings = sortBy(weightedRatings, 'weightedRating').reverse()
  return sortedWeightedRatings
}


export function extractKid(pages: RawDiaryPage[]): Kid {
  return pages[0].kid
}

export function refinePages(rawPages: RawDiaryPage[]): DiaryPage[] {
  const pages = rawPages
    .filter(p => p.posts.length > 0)
    .map(rawPage => {
      const { date } = rawPage
      const food = rawPage.posts.flatMap(post => {
        if (!post.subposts) return []
        const course = post.course || post.subtype || ""
        const subpostFood = post.subposts.flatMap(s => ({ course, name: s.name, quantity: s.kid?.qty?.n, text: s.kid?.qty?.text }))
        return subpostFood.filter(f => f.quantity !== undefined)
      })
      return { food, date }
    })
  return pages
}

export function weekGrouper(d: Date) {
  const year = d.getFullYear()
  const week = String(weekNumber(d)).padStart(2, "0")
  return `${year}-${week}`
}

export function monthGrouper(d: Date) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

export function yearGrouper(d: Date) {
  const year = d.getFullYear()
  return `${year}`
}