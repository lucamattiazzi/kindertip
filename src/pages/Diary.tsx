import { CellClickedEvent, ColDef } from "ag-grid-community"
import { useAtom } from "jotai"
import { useState } from "react"
import { BrowserView, MobileView } from 'react-device-detect'
import { DesktopDiaryComponent, MobileDiaryComponent } from "../containers/DiaryComponent"
import { FoodRatingComponent } from "../containers/FoodRating"
import { getEmoji } from "../lib/emoji"
import { FoodRating, RendererProps } from "../lib/types"
import { bestFoodsAtom } from "../state"

const COLUMNS: ColDef[] = [
  { field: "name", headerName: "Piatto", flex: 3, suppressMovable: true, cellRenderer: (p: RendererProps<string>) => `${getEmoji(p.value)} - ${p.value}` },
  { field: "weightedRating", headerName: "Rating", flex: 1, suppressMovable: true, cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2) },
  { field: "votes", headerName: "Occorrenze", flex: 1, suppressMovable: true, cellRenderer: (p: RendererProps<number[]>) => p.value.length },
  { field: "avg", headerName: "Media", flex: 1, suppressMovable: true, cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2)},
]

export function DiaryComponent() {
  const [selectedRating, setSelectedRating] = useState<FoodRating | null>(null)
  const [bestFoods] = useAtom(bestFoodsAtom)

  const onCellClicked = (p: CellClickedEvent) => setSelectedRating(p.data as FoodRating)
  
  return (
    <>
      <h1 className="text-xl text-bold text-center mb-2">Piatti</h1>
      <BrowserView>
        <DesktopDiaryComponent bestFoods={bestFoods} onCellClicked={onCellClicked} columns={COLUMNS} />
      </BrowserView>
      <MobileView className="w-full h-full">
        <MobileDiaryComponent bestFoods={bestFoods} onCellClicked={onCellClicked} columns={COLUMNS} />
      </MobileView>
      { selectedRating && <FoodRatingComponent foodRating={selectedRating} onClick={() => setSelectedRating(null)}/> }
    </>
  )
}
