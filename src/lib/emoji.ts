import emojis from '../static/emojis.json'
import { FoodRating } from './types'

const emojiDict = Object.entries(emojis).reduce<Record<string, string>>((acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }), {})

export function getEmoji(food: string): string {
  return emojiDict[food.toLowerCase()] || "❓"
}

export function getRatingEmoji(bestFoods: FoodRating[], food: string): string {
  const rating = bestFoods.find(f => f.name === food)
  if (!rating) return "❓"
  if (rating.weightedRating > 8) return "😄"
  if (rating.weightedRating > 6) return "😊"
  if (rating.weightedRating > 4) return "😐"
  if (rating.weightedRating > 2) return "🙁"
  return "😖"
}