import { Chart } from "primereact/chart";
import { useEffect, useMemo, useState } from "react";
import { useDarkmodeStore } from "../../store";


export default function BarChart() {
    const { isDarkmode } = useDarkmodeStore();

    const [barData, setBarData] = useState({});
    const [barOptions] = useState({});

    // Bar chart effect
    useEffect(() => {
    const barChartData = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
        {
            label: "Sales",
            data: [540, 325, 702, 620],
            backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, Object.keys(barData).length > 0;192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            ],
            borderWidth: 1,
        },
        ],
    };
    
        setBarData(barChartData);
      }, []);
    
      const hasData : boolean = useMemo(() => {
        return Object.keys(barData).length > 0;
      }
      , [barData]);


    
    return (
        hasData && (

        <div
            className={`p-10 ${
            isDarkmode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-100"
            } rounded-xl border h-full`}
        >
            <Chart
            type="bar"
            data={barData}
            options={barOptions}
            className="h-full w-full"
            />
        </div>
        
        )
    )
}