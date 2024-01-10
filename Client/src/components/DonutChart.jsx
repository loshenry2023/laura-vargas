import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function DonutChart({ data, title }) {
  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            label={(entry) => `${(entry.percent * 100).toFixed(2)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.value !== null && entry.value !== undefined
                    ? colors[index % colors.length]
                    : "rgba(0, 0, 0, 0)"
                }
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#333"
          >
            {" "}
            Total: {totalValue}
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ marginLeft: "20px" }}>
        <ul>
          {data.map((entry, index) => (
            <div
              className="text-xs"
              key={`legend-${index}`}
              style={{ marginBottom: "10px" }}
            >
              <li>
                <span
                  style={{
                    display:
                      entry && entry.name && entry.name.includes("Total")
                        ? "none"
                        : "inline-block",
                    width: "12px",
                    height: "12px",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                ></span>
                {entry ? `${entry.name}: ${entry.value}` : ""}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DonutChart;
