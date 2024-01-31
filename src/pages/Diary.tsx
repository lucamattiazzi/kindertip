import { CellClickedEvent, ColDef } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-material.css"
import { useAtom } from "jotai"
import { useState } from "react"
import { BrowserView, MobileView } from 'react-device-detect'
import { DesktopDiaryComponent, MobileDiaryComponent } from "../components/DiaryComponent"
import { FoodRatingComponent } from "../components/FoodRating"
import { Header } from "../components/Header"
import { TrendRenderer } from "../components/TrendRenderer"
import { FoodRating, RendererProps } from "../lib/types"
import { getBestFoods } from "../lib/utils"
import { diaryAtom } from "../state"

const COLUMNS: ColDef[] = [
  { field: "name", headerName: "Piatto", suppressMovable: true },
  { field: "weightedRating", headerName: "Rating", suppressMovable: true, cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2) },
  { field: "votes", headerName: "Trend", suppressMovable: true, cellRenderer: TrendRenderer },
  { field: "votes", headerName: "Occorrenze", suppressMovable: true, cellRenderer: (p: RendererProps<number[]>) => p.value.length },
  { field: "avg", headerName: "Media", suppressMovable: true, cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2)},
]

export function DiaryComponent() {
  const [selectedRating, setSelectedRating] = useState<FoodRating | null>(null)
  const [diary] = useAtom(diaryAtom)
  const bestFoods = getBestFoods(diary!)

  const onCellClicked = (p: CellClickedEvent) => setSelectedRating(p.data as FoodRating)
  
  return (
    <>
      <Header component="diary" />
      <h1 className="text-xl text-bold text-center mb-2">Piatti</h1>
      <BrowserView>
        <DesktopDiaryComponent bestFoods={bestFoods} onCellClicked={onCellClicked} columns={COLUMNS} />
      </BrowserView>
      <MobileView>
        <MobileDiaryComponent bestFoods={bestFoods} onCellClicked={onCellClicked} columns={COLUMNS} />
      </MobileView>
      { selectedRating && <FoodRatingComponent foodRating={selectedRating} onClick={() => setSelectedRating(null)}/> }
    </>
  )
}
