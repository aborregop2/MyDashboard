import MyChart from "../ui/MyChart"
import { useEffect, useMemo, useState } from "react"
import { useDarkmodeStore } from "../../store"

export default function BarChart() {
  const { isDarkmode } = useDarkmodeStore()
  console.log(isDarkmode)

  const [barData, setBarData] = useState({})
  const [barOptions, setBarOptions] = useState({})

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
            "rgb(204, 102, 0)",     // Borde naranja oscuro
            "rgb(0, 128, 128)",     // Borde verde-azulado oscuro
            "rgb(0, 82, 204)",      // Borde azul intenso
            "rgb(102, 0, 204)"      // Borde púrpura oscuro
          ],
          borderWidth: 1,
        },
      ],
    }

    setBarData(barChartData)
  }, [])

  useEffect(() => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: isDarkmode ? "#ffffff" : "#333333" },
          grid: { color: isDarkmode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
        },
        y: {
          ticks: { color: isDarkmode ? "#ffffff" : "#333333" },
          grid: { color: isDarkmode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
        },
      },
      plugins: {
        legend: {
          labels: { color: isDarkmode ? "#ffffff" : "#333333" },
          position: "top",
        },
      },
    }

    setBarOptions(options)
  }, [isDarkmode])


  const hasData: boolean = useMemo(() => {
    return Object.keys(barData).length > 0 && Object.keys(barOptions).length > 0
  }, [barData, barOptions])

  return (
    hasData && (
      <div
        className="p-4 sm:p-6 md:p-8 bg-white border-gray-100 dark:bg-slate-800 dark:border-slate-700 
       rounded-xl border h-full flex flex-col justify-center"
      >
        <div className="w-full h-full">
          <MyChart type="bar" data={barData} options={barOptions} className="w-full h-full" />
        </div>
      </div>
    )
  )
}

