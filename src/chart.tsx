/** @jsx createElement */
import { createElement } from "./jsx-runtime";
import { DataPoint } from "./data-service";

interface ChartProps {
  data: DataPoint[];
  type: "bar" | "line" | "pie";
  width?: number;
  height?: number;
  title?: string;
}

const Chart = ({ data, type, width = 600, height = 400, title }: ChartProps) => {
  const canvasRef = { current: null as HTMLCanvasElement | null };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    switch (type) {
      case "bar":
        drawBarChart(ctx, data, width, height);
        break;
      case "line":
        drawLineChart(ctx, data, width, height);
        break;
      case "pie":
        drawPieChart(ctx, data, width, height);
        break;
    }
  };

  setTimeout(() => drawChart(), 0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {title && (
        <h3
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "700",
            color: "#1f2937",
          }}
        >
          {title}
        </h3>
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      />
    </div>
  );
};



function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number
) {
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = chartWidth / data.length - 10;

  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  data.forEach((point, index) => {
    const barHeight = (point.value / maxValue) * chartHeight;
    const x = padding + index * (barWidth + 10) + 5;
    const y = height - padding - barHeight;

    ctx.fillStyle = point.color || "#3b82f6";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#1f2937";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(point.label, x + barWidth / 2, height - padding + 20);

    ctx.fillText(String(point.value), x + barWidth / 2, y - 5);
  });

  ctx.fillStyle = "#6b7280";
  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const value = (maxValue / 5) * i;
    const y = height - padding - (chartHeight / 5) * i;
    ctx.fillText(Math.round(value).toString(), padding - 10, y + 5);
  }
}

function drawLineChart(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number
) {
  const padding = 60;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...data.map((d) => d.value));
  const stepX = chartWidth / (data.length - 1 || 1);

  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (point.value / maxValue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  data.forEach((point, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (point.value / maxValue) * chartHeight;

    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1f2937";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(point.label, x, height - padding + 20);

    ctx.fillText(String(point.value), x, y - 10);
  });

  ctx.fillStyle = "#6b7280";
  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const value = (maxValue / 5) * i;
    const y = height - padding - (chartHeight / 5) * i;
    ctx.fillText(Math.round(value).toString(), padding - 10, y + 5);
  }
}

function drawPieChart(
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 60;

  const total = data.reduce((sum, point) => sum + point.value, 0);
  let currentAngle = -Math.PI / 2;

  data.forEach((point) => {
    const sliceAngle = (point.value / total) * Math.PI * 2;

    ctx.fillStyle = point.color || "#3b82f6";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    const labelAngle = currentAngle + sliceAngle / 2;
    const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
    const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(point.label, labelX, labelY);

    const percentage = Math.round((point.value / total) * 100);
    ctx.fillText(`${percentage}%`, labelX, labelY + 20);

    currentAngle += sliceAngle;
  });

  const legendX = 20;
  let legendY = height - data.length * 25 - 20;

  data.forEach((point) => {

    ctx.fillStyle = point.color || "#3b82f6";
    ctx.fillRect(legendX, legendY, 15, 15);


    ctx.fillStyle = "#1f2937";
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`${point.label}: ${point.value}`, legendX + 20, legendY + 12);

    legendY += 25;
  });
}

export { Chart };