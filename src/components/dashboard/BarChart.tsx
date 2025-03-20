import MyChart from "../ui/MyChart"
import { useEffect, useMemo, useState } from "react"
import { useDarkmodeStore } from "../../store"

export default function BarChart() {
  const { isDarkmode } = useDarkmodeStore()

  const [barData, setBarData] = useState({})

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
          borderColor: ["rgb(255, 159, 64)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)"],
          borderWidth: 1,
        },
      ],
    }

    setBarData(barChartData)
  }, [])

  const hasData: boolean = useMemo(() => {
    return Object.keys(barData).length > 0
  }, [barData])

  return (
    hasData && (
      <div
        className={`p-4 sm:p-6 md:p-8 ${
          isDarkmode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
        } rounded-xl border h-full flex flex-col justify-center`}
      >
        <MyChart type="bar" data={barData} className="w-full h-full" />
      </div>
    )
  )
}

