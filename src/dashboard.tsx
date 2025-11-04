/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";
import { Card, Button, Select } from "./components";
import { Chart } from "./chart";
import { DataService, DataPoint } from "./data-service";

const Dashboard = () => {
  const dataService = new DataService();

  const [getData, setData] = useState<DataPoint[]>(dataService.generateCategoryData());
  const [getChartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [getIsRealTime, setIsRealTime] = useState(false);
  const [getDataType, setDataType] = useState<"category" | "timeseries">("category");

  const refreshData = () => {
    if (getDataType() === "category") {
      setData(dataService.generateCategoryData());
    } else {
      setData(dataService.generateTimeSeriesData());
    }
  };

  const toggleRealTime = () => {
    if (getIsRealTime()) {
      dataService.stopRealTimeUpdates();
      setIsRealTime(false);
    } else {
      dataService.startRealTimeUpdates((newData) => {
        setData(newData);
      }, 3000);
      setIsRealTime(true);
    }
  };

  const handleDataTypeChange = (type: string) => {
    setDataType(type as "category" | "timeseries");
    if (type === "category") {
      setData(dataService.generateCategoryData());
    } else {
      setData(dataService.generateTimeSeriesData());
    }
  };

  const stats = dataService.getStatistics(getData());

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          📊 Analytics Dashboard
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Real-time data visualization and analytics
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Chart Type Selector */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Chart Type
            </label>
            <Select
              value={getChartType()}
              onChange={(val) => setChartType(val as "bar" | "line" | "pie")}
              options={[
                { value: "bar", label: "Bar Chart" },
                { value: "line", label: "Line Chart" },
                { value: "pie", label: "Pie Chart" },
              ]}
            />
          </div>

          {/* Data Type Selector */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Data Type
            </label>
            <Select
              value={getDataType()}
              onChange={handleDataTypeChange}
              options={[
                { value: "category", label: "Category Data" },
                { value: "timeseries", label: "Time Series" },
              ]}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <Button onClick={refreshData} variant="primary">
              🔄 Refresh
            </Button>
            <Button
              onClick={toggleRealTime}
              variant={getIsRealTime() ? "danger" : "secondary"}
            >
              {getIsRealTime() ? "⏸ Stop" : "▶ Start"} Real-time
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Card title="Total">
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#3b82f6" }}>
            {stats.total.toFixed(0)}
          </div>
        </Card>
        <Card title="Average">
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#10b981" }}>
            {stats.average.toFixed(2)}
          </div>
        </Card>
        <Card title="Minimum">
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#f59e0b" }}>
            {stats.min}
          </div>
        </Card>
        <Card title="Maximum">
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#ef4444" }}>
            {stats.max}
          </div>
        </Card>
      </div>

      {/* Chart */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Chart
          data={getData()}
          type={getChartType()}
          width={800}
          height={500}
          title="Data Visualization"
        />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "24px",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p>Dashboard built with custom JSX runtime • Exercise 4.1</p>
      </div>
    </div>
  );
};

export { Dashboard };