import emojis from '../static/emojis.json'
import { FoodRating } from './types'

const emojiDict = Object.entries(emojis).reduce<Record<string, string>>((acc, [k, v]) => ({ ...acc, [k.toLowerCase()]: v }), {})

export function getEmoji(food: string): string {
  return emojiDict[food.toLowerCase()] || "❓"
}

export function getRatingEmoji(bestFoods: FoodRating[], food: string): string {
  const ratingIndex = bestFoods.findIndex(f => f.name === food)
  if (ratingIndex === -1) return "❓"
  if (ratingIndex < bestFoods.length / 3) return "😊"
  if (ratingIndex < 2 * bestFoods.length / 3) return "😐"
  return "😕"
}