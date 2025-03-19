import { useEffect, useMemo, useState } from "react";
import { useDarkmodeStore } from "../../store";
import { Chart } from "primereact/chart";


export default function ComboChart() {
    const { isDarkmode } = useDarkmodeStore();

    const [comboData, setComboData] = useState({});

    // Combo chart effect
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);

        const comboChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
            type: "line",
            label: "Dataset 1",
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42],
            },
            {
            type: "bar",
            label: "Dataset 2",
            backgroundColor: documentStyle.getPropertyValue("--green-500"),
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: isDarkmode ? "#1e293b" : "white",
            borderWidth: 2,
            },
            {
            type: "bar",
            label: "Dataset 3",
            backgroundColor: documentStyle.getPropertyValue("--orange-500"),
            data: [41, 52, 24, 74, 23, 21, 32],
            },
        ],
        };

        setComboData(comboChartData);
    }, []);

    const hasData: Boolean = useMemo(() =>
        Object.keys(comboData).length > 0
    , [comboData]);

    return (
        hasData && (<div
          className={`flex justify-center items-center mt-10 mb-11 ${
            isDarkmode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-100"
          } rounded-xl border p-10`}
        >
          <Chart
            type="bar"
            data={comboData}
            className="w-250"
          />
        </div>)
    )
    
}