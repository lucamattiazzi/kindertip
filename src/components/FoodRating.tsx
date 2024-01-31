import { ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { FoodRating } from "../lib/types"

interface FoodRatingProps {
  foodRating: FoodRating
  onClick: () => void
}

const COLUMNS: ColDef[] = [
  { field: "date", headerName: "Data", suppressMovable: true},
  { field: "vote", headerName: "Voto", suppressMovable: true} 
]

export function FoodRatingComponent(p: FoodRatingProps) {
  const votes = p.foodRating.votes.map((_, idx) => {
    const date = new Date(p.foodRating.dates[idx])
    const vote = p.foodRating.votes[idx]
    return { date, vote }
  })  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/95 flex flex-col items-center justify-start z-50 py-8" onClick={p.onClick}>
      <div className="text-2xl font-bold text-center w-full pb-12">{p.foodRating.name}</div>
      <div className="flex flex-col items-center justify-center w-2/3 text-xl">
        <div className="pb-4 w-2/3 flex flex-row justify-between items-center">
          <span>Rating: </span>
          <span>{p.foodRating.weightedRating.toFixed(2)}</span>
        </div>
        <div className="pb-4 w-2/3 flex flex-row justify-between items-center">
          <span>Media: </span>
          <span>{p.foodRating.avg}</span>
        </div>
        <div className="pb-12 w-2/3 flex flex-row justify-between items-center">
          <span>Occorrenze: </span>
          <span>{p.foodRating.votes.length}</span>
        </div>
        <div className="w-full h-80">
          <div className="ag-theme-material" style={{ width: '100%', height: '100%' }}>
            <AgGridReact rowData={votes} columnDefs={COLUMNS}/>
          </div>
        </div>
      </div>
    </div>
  )
}
