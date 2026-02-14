type CustomLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
  fill?: string;
  value?: number;
};

export function CustomLabel({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, percent = 0, name = "", fill = "", value = 0 }: CustomLabelProps) {
  if (value === 0 || percent === 0 || Math.round(percent * 100) === 0) {
    return null;
  }
  const RADIAN = Math.PI / 180;
  const labelRadius = outerRadius + 25;
  const labelX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const labelY = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  const connectX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const connectY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  return (
    <g>
      <line x1={connectX} y1={connectY} x2={labelX} y2={labelY} stroke={fill} strokeWidth={1.5} />
      <text
        x={labelX}
        y={labelY}
        fill={fill}
        textAnchor={labelX > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px"
        fontWeight="500"
      >
        {name} ({Math.round(percent * 100)}%)
      </text>
    </g>
  );
}
