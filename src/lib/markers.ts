import { Marker } from "ag-charts-community";

export interface ScatterWithErrorDatum {
  avg: number
  sdev: number
}


export class MarkerWithError extends Marker {
  toRadians(degrees: number) {
    return (degrees / 180) * Math.PI;
  }

  updatePath() {
    const { x, path, size, _datum, y } = this
    if (!_datum.datum) return
    const { datum } = _datum as { datum: ScatterWithErrorDatum }
    const errorBarsSize = datum.sdev * size / 6
    const r = size / 2

    path.clear()

    path.moveTo(x, y + errorBarsSize * r)
    path.lineTo(x, y + r)
    path.moveTo(x, y - r)
    path.lineTo(x, y - errorBarsSize * r)
    path.moveTo(x - r, y + errorBarsSize * r)
    path.lineTo(x + r, y + errorBarsSize * r)
    path.moveTo(x - r, y - errorBarsSize * r)
    path.lineTo(x + r, y - errorBarsSize * r)

    path.moveTo(x + r, y)
    path.arc(x, y, r, this.toRadians(0), this.toRadians(360), true)
    path.closePath()
  }
}
