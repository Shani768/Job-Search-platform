import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  interface SalaryData {
    name: string;
    "Minimum Salary": number;
    "Median Salary": number;
    "Maximum Salary": number;
  }
  
  interface SalaryChartProps {
    salaryData: SalaryData;
  }
  
  export const SalaryChart: React.FC<SalaryChartProps> = ({ salaryData }) => {
    const data: SalaryData[] = [salaryData]; // ensure it's an array
  
    return (
      <ResponsiveContainer width={300} height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value: number) => `$${value.toLocaleString()}`} />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="Minimum Salary" fill="#facc15" />
          <Bar dataKey="Median Salary" fill="#f472b6" />
          <Bar dataKey="Maximum Salary" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  