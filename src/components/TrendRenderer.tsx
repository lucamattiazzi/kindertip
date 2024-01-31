import { Sparklines, SparklinesCurve } from "react-sparklines";
import { RendererProps } from "../lib/types";

export function TrendRenderer(p: RendererProps<number[]>) {
  return (
    <div>
      <Sparklines data={p.value} min={0} max={10} limit={p.value.length} width={100} height={20} margin={3}>
        <SparklinesCurve />
      </Sparklines>
    </div>
  )
}

