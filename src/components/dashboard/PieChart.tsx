import { useEffect, useMemo, useState } from "react"
import { useDarkmodeStore } from "../../store"
import MyChart from "../ui/MyChart"

export default function PieChart() {
  const { isDarkmode } = useDarkmodeStore()

  const [pieData, setPieData] = useState({})
  const [pieOptions, setPieOptions] = useState({})

  // Pie chart effect
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const pieChartData = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
          borderColor: isDarkmode ? "#ffffff" : "#ffffff",
          borderWidth: isDarkmode ? 2 : 1,
        },
      ],
    }

    setPieData(pieChartData)

    // Set options for dark mode
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: isDarkmode ? "#ffffff" : "#333333",
            font: {
              weight: "bold",
            },
          },
          position: "top",
        },
        tooltip: {
          titleColor: isDarkmode ? "#ffffff" : "#333333",
          bodyColor: isDarkmode ? "#ffffff" : "#333333",
          backgroundColor: isDarkmode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
          borderColor: isDarkmode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
          padding: 10,
          boxPadding: 5,
        },
      },
    }

    setPieOptions(options)
  }, [isDarkmode])

  const hasData: boolean = useMemo(() => {
    return Object.keys(pieData).length > 0 && Object.keys(pieOptions).length > 0
  }, [pieData, pieOptions])

  return (
    hasData && (
      <div
        className="bg-white border-gray-100 dark:bg-slate-800 dark:border-slate-700
      rounded-xl border h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center"
      >
        <div className="w-full h-full flex justify-center items-center">
          <MyChart type="pie" data={pieData} options={pieOptions} className="w-full h-full max-h-[400px]" />
        </div>
      </div>
    )
  )
}

