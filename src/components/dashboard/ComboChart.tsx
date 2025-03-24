import { useEffect, useMemo, useState } from "react"
import { useDarkmodeStore } from "../../store"
import MyChart from "../ui/MyChart"

export default function ComboChart() {
  const { isDarkmode } = useDarkmodeStore()

  const [comboData, setComboData] = useState({})
  const [comboOptions, setComboOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)

    const comboChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          label: "Dataset 1",
          borderColor: localStorage.theme === "dark" ? "#ffffff" : documentStyle.getPropertyValue("--blue-500"),
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
          borderWidth: 2,
          borderColor: localStorage.theme === "dark" ? "#ffffff" : undefined,
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
          borderWidth: 2,
          borderColor: localStorage.theme === "dark" ? "#ffffff" : undefined,
        },
      ],
    }

    setComboData(comboChartData)
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
    setComboOptions(options)
  }, [isDarkmode])

  const hasData: boolean = useMemo(
    () => Object.keys(comboData).length > 0 && Object.keys(comboOptions).length > 0,
    [comboData, comboOptions],
  )

  return (
    hasData && (
      <div
        className="flex flex-col justify-center items-center h-full w-full p-4 sm:p-6 md:p-8 
        bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700
        rounded-xl border"
      >
        <div className="w-full h-full">
          <MyChart type="bar" data={comboData} options={comboOptions} className="w-full h-full" />
        </div>
      </div>
    )
  )
}

