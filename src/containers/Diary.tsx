import { ColDef } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from 'ag-grid-react'
import { useState } from "react"
import { BrowserView, MobileView } from 'react-device-detect'
import Select from 'react-select'
import { Sparklines, SparklinesCurve } from "react-sparklines"
import { Diary, FoodRating } from "../lib/types"
import { getBestFoods } from "../lib/utils"

interface DiaryProps {
  diary: Diary
}

interface DeviceDiaryProps {
  bestFoods: FoodRating[]
  columns: ColDef[]
}

interface RendererProps<T> {
  value: T
}

function TrendRenderer(p: RendererProps<number[]>) {
  return (
    <div>
      <Sparklines data={p.value} limit={10} width={100} height={20} margin={3}>
        <SparklinesCurve />
      </Sparklines>
    </div>
  )
  return 
}

export function MobileDiaryComponent(p: DeviceDiaryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [fixedColumn, ...otherColumns] = p.columns

  const selectOptions = otherColumns.map((c) => ({ value: c.headerName, label: c.headerName }))
  const selectedColumns = [fixedColumn, otherColumns[selectedIdx]]

  return (
    <>
      <div className="flex flex-row items-center pb-2">
        <div className="px-2">See:</div>
        <div className="w-full">
          <Select
            options={selectOptions}
            defaultValue={selectOptions[selectedIdx]}
            onChange={(o) => setSelectedIdx(selectOptions.findIndex((f) => f.value === o?.value))}
          />
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={p.bestFoods} columnDefs={selectedColumns} />
      </div>
    </>
  )
}

function DesktopDiaryComponent(p: DeviceDiaryProps) {
  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={p.bestFoods} columnDefs={p.columns} />
    </div>
  )
}

export function DiaryComponent(p: DiaryProps) {
  const bestFoods = getBestFoods(p.diary)
  const columns: ColDef[] = [
    { field: "name", headerName: "Meal"},
    { field: "weightedRating", headerName: "Weighted Rating", cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2) },
    { field: "votes", headerName: "Trend", cellRenderer: TrendRenderer },
    { field: "votes", headerName: "Occurrences", cellRenderer: (p: RendererProps<number[]>) => p.value.length },
    { field: "avg", headerName: "Average Rating", cellRenderer: (p: RendererProps<number>) => p.value.toFixed(2)},
  ]
  return (
    <>
      <h1 className="text-2xl text-bold text-center mb-2">Meals by Preference</h1>
      <BrowserView>
        <DesktopDiaryComponent bestFoods={bestFoods} columns={columns} />
      </BrowserView>
      <MobileView>
        <MobileDiaryComponent bestFoods={bestFoods} columns={columns} />
      </MobileView>
    </>
  )
}
