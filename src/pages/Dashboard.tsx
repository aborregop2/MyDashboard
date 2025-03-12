"use client"

import { Chart } from "primereact/chart"
import Topbar from "../components/Topbar"
import { useEffect, useState } from "react"
import { useLoginStore } from "../store/index"



export default function Dashboard() {

  const {isLogin ,setIsLogin } = useLoginStore()
  if (!isLogin) {
    setIsLogin(true)
  }

  // Chart states
  const [barData, setBarData] = useState({})
  const [barOptions, setBarOptions] = useState({})
  const [pieData, setPieData] = useState({})
  const [pieOptions, setPieOptions] = useState({})
  const [comboData, setComboData] = useState({})
  const [comboOptions, setComboOptions] = useState({})

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

    const barChartOptions = {
      scales: {
        y: { beginAtZero: true },
      },
    }

    setBarData(barChartData)
    setBarOptions(barChartOptions)
  }, [])

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

    const pieChartOptions = {
      plugins: {
        legend: {
          labels: { usePointStyle: true },
        },
      },
    }

    setPieData(pieChartData)
    setPieOptions(pieChartOptions)
  }, [])

  // Combo chart effect
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue("--text-color")
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary")
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border")

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
          borderColor: "white",
          borderWidth: 2,
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    }

    const comboChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
      },
    }

    setComboData(comboChartData)
    setComboOptions(comboChartOptions)
  }, [])
  
  return (
    <>
    <Topbar />

    <div className="w-full min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 h-[60vh]">
            <div className="bg-white rounded-xl border border-gray-100 h-full">
            <Chart 
                type="bar" 
                data={barData} 
                options={barOptions} 
                className="h-full w-full"
            />
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 h-full flex justify-center items-center">
            <Chart
                type="pie"
                data={pieData}
                options={pieOptions}
                className="w-100"
            />
            </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 h-[35vh] flex justify-center items-center mt-40 mb-11">
            <Chart
                type="bar"
                data={comboData}
                options={comboOptions}
                className="w-250"
            />
        </div>
    </div>
    </>
  )
}

