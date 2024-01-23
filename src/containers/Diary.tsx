import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from 'ag-grid-react'
import { Sparklines, SparklinesCurve } from "react-sparklines"
import { Diary } from "../lib/types"
import { getBestFoods } from "../lib/utils"

interface DiaryProps {
  diary: Diary
}

interface TrendRendererProps {
  value: number[]
}

function TrendRenderer(p: TrendRendererProps) {
  return (
    <div>
      <Sparklines data={p.value} limit={10} width={100} height={20} margin={3}>
        <SparklinesCurve />
      </Sparklines>
    </div>
  )
  return 
}

export function DiaryComponent(p: DiaryProps) {
  const bestFoods = getBestFoods(p.diary)
  const columns = [{field: "name"}, {field: "weightedRating"}, { field: "votes", headerName: "Trend", cellRenderer: TrendRenderer }]
  const rowData = bestFoods.map(f => ({ ...f, weightedRating: f.weightedRating.toFixed(2) }))

  return (
    <>
      <h1 className="text-3xl text-bold text-center mb-3">Food Preferences</h1>
      <p className="text-xxs text-center">Weighted rating is computed </p>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columns} />
      </div>
    </>
  )
}