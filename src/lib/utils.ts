import { groupBy, mean, sortBy } from "lodash-es"
import { Diary, DiaryPage, FoodRating, Kid, RawDiaryPage } from "./types"

const COMMON_FOODS_CONSTANT = 6
const MINUMUM_VOTES = 1

const quantityToVote = (quantity: number) => (4 - quantity) * 3.5

export function getBestFoods(diary: Diary): FoodRating[] {
  const foods = diary.pages.flatMap(p => p.food)
  const grouped = groupBy(foods, f => f.name)
  const allVotes = Object.entries(grouped).map(([k, v]) => ({ name: k, votes: v.map(f => quantityToVote(f.quantity)) }))
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
  const kid = pages[0].kid
  return kid
}

export function refinePages(rawPages: RawDiaryPage[]): DiaryPage[] {
  const pages = rawPages.map(rawPage => {
    if (rawPage.posts.length === 0) return { food: [], date: "nope" }
    const date = rawPage.posts[0].cDate.slice(0, 10)
    const foodPosts = rawPage.posts.filter(post => post.course)
    if (foodPosts.length === 0) return { food: [], date }
    const food = foodPosts.flatMap(post => {
      const course = post.course || ""
      const subpostFood = post.subposts.flatMap(s => ({ course, name: s.name, quantity: s.kid.qty.n }))
      return subpostFood
    })
    return { food, date }
  })
  return pages
}
