"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Barchart = ({ students = 100, teachers = 50 }) => {
  const data = [
    {
      name: "Students",
      count: students,
      fill: "#4f46e5", // indigo-600
    },
    {
      name: "Teachers",
      count: teachers,
      fill: "#10b981", // emerald-500
    },
  ];

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={20}
          data={data}
        >
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="count"
            background
            label={{ position: "insideStart", fill: "#fff", fontSize: 12 }}
          />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
