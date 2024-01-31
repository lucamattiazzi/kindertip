import { CellClickedEvent, ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { useState } from "react"
import Select from 'react-select'
import { FoodRating } from "../lib/types"

interface DeviceDiaryProps {
  bestFoods: FoodRating[]
  columns: ColDef[]
  onCellClicked: (p: CellClickedEvent) => void
}

export function DesktopDiaryComponent(p: DeviceDiaryProps) {
  return (
    <div className="ag-theme-material" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={p.bestFoods} columnDefs={p.columns} onCellClicked={p.onCellClicked}/>
    </div>
  )
}

export function MobileDiaryComponent(p: DeviceDiaryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [fixedColumn, ...otherColumns] = p.columns

  const selectOptions = otherColumns.map((c) => ({ value: c.headerName, label: c.headerName }))
  const selectedColumns = [fixedColumn, otherColumns[selectedIdx]]

  return (
    <>
      <div className="flex flex-row items-center pb-2">
        <div className="px-2">Dato:</div>
        <div className="w-full">
          <Select
            isSearchable={false}
            options={selectOptions}
            defaultValue={selectOptions[selectedIdx]}
            onChange={(o) => setSelectedIdx(selectOptions.findIndex((f) => f.value === o?.value))}
          />
        </div>
      </div>
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact rowData={p.bestFoods} columnDefs={selectedColumns} onCellClicked={p.onCellClicked}/>
      </div>
    </>
  )
}
