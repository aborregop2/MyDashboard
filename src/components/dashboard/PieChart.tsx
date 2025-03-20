import { useEffect, useMemo, useState } from "react"
import { useDarkmodeStore } from "../../store"
import MyChart from "../ui/MyChart"

export default function PieChart() {
  const { isDarkmode } = useDarkmodeStore()

  const [pieData, setPieData] = useState({})

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
        },
      ],
    }

    setPieData(pieChartData)
  }, [])

  const hasData: boolean = useMemo(() => {
    return Object.keys(pieData).length > 0
  }, [pieData])

  return (
    hasData && (
      <div
        className={`${
          isDarkmode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
        } rounded-xl border h-full p-4 sm:p-6 md:p-8 flex justify-center items-center`}
      >
        <MyChart type="pie" data={pieData} className="w-full max-w-[500px] h-auto" />
      </div>
    )
  )
}

