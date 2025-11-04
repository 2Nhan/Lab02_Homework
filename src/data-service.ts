export interface DataPoint {
    label: string;
    value: number;
    color?: string;
    category?: string;
    date?: Date;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
    }[];
  }
  
  export class DataService {
    private updateCallbacks: ((data: DataPoint[]) => void)[] = [];
    private intervalId: number | null = null;
  

    generateMockData(count: number = 7): DataPoint[] {
      const categories = ["Sales", "Marketing", "Development", "Support", "HR"];
      const data: DataPoint[] = [];
  
      for (let i = 0; i < count; i++) {
        data.push({
          label: categories[i % categories.length],
          value: Math.floor(Math.random() * 100) + 20,
          color: this.getRandomColor(),
          category: categories[i % categories.length],
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        });
      }
  
      return data;
    }
  

    generateTimeSeriesData(days: number = 7): DataPoint[] {
      const data: DataPoint[] = [];
      const today = new Date();
  
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        data.push({
          label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 50) + 30,
          date: date,
        });
      }
  
      return data;
    }
  

    generateCategoryData(): DataPoint[] {
      return [
        { label: "Product A", value: 45, color: "#3b82f6" },
        { label: "Product B", value: 30, color: "#10b981" },
        { label: "Product C", value: 25, color: "#f59e0b" },
        { label: "Product D", value: 60, color: "#ef4444" },
        { label: "Product E", value: 40, color: "#8b5cf6" },
      ];
    }
  

    startRealTimeUpdates(callback: (data: DataPoint[]) => void, interval: number = 3000) {
      this.updateCallbacks.push(callback);
  
      this.intervalId = window.setInterval(() => {
        const newData = this.generateMockData();
        this.updateCallbacks.forEach((cb) => cb(newData));
      }, interval);
    }
  
 
    stopRealTimeUpdates() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.updateCallbacks = [];
    }
  

    filterByCategory(data: DataPoint[], category: string): DataPoint[] {
      return data.filter((point) => point.category === category);
    }
  

    filterByDateRange(
      data: DataPoint[],
      startDate: Date,
      endDate: Date
    ): DataPoint[] {
      return data.filter((point) => {
        if (!point.date) return false;
        return point.date >= startDate && point.date <= endDate;
      });
    }
  
    // Get statistics
    getStatistics(data: DataPoint[]) {
      const values = data.map((d) => d.value);
      return {
        total: values.reduce((a, b) => a + b, 0),
        average: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        count: values.length,
      };
    }
  

    private getRandomColor(): string {
      const colors = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#14b8a6",
        "#f97316",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    // Convert to chart format
    toChartData(data: DataPoint[], datasetLabel: string = "Dataset"): ChartData {
      return {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: datasetLabel,
            data: data.map((d) => d.value),
            backgroundColor: data.map((d) => d.color || "#3b82f6"),
            borderColor: "#ffffff",
          },
        ],
      };
    }
  }