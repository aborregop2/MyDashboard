"use client"

import { Chart } from "primereact/chart"
import { useEffect, useState } from "react"
import { useDarkmodeStore } from "../store"

export default function Dashboard() {
  const { isDarkmode } = useDarkmodeStore();

  /*useEffect(() => {
    if (!user || !user.email) {
      navigate("/auth");
    }
  }, [user, navigate]);*/

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
        y: { 
          beginAtZero: true,
          grid: {
            color: isDarkmode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: isDarkmode ? '#e2e8f0' : '#64748b'
          }
        },
        x: {
          grid: {
            color: isDarkmode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            color: isDarkmode ? '#e2e8f0' : '#64748b'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: isDarkmode ? '#e2e8f0' : '#64748b'
          }
        }
      }
    }

    setBarData(barChartData)
    setBarOptions(barChartOptions)
  }, [isDarkmode])

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
          labels: { 
            usePointStyle: true,
            color: isDarkmode ? '#e2e8f0' : '#64748b'
          },
        },
      },
    }

    setPieData(pieChartData)
    setPieOptions(pieChartOptions)
  }, [isDarkmode])

  // Combo chart effect
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = isDarkmode ? '#e2e8f0' : documentStyle.getPropertyValue("--text-color") || '#64748b'
    const textColorSecondary = isDarkmode ? '#cbd5e1' : documentStyle.getPropertyValue("--text-color-secondary") || '#94a3b8'
    const surfaceBorder = isDarkmode ? 'rgba(255, 255, 255, 0.1)' : documentStyle.getPropertyValue("--surface-border") || 'rgba(0, 0, 0, 0.1)'

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
    }

    const comboChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: { 
        legend: { 
          labels: { 
            color: textColor 
          } 
        } 
      },
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
  }, [isDarkmode])
  
  
  return (
    <div className={`w-full min-h-screen ${isDarkmode ? 'bg-slate-900' : 'bg-gray-50'} p-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1 h-[60vh]">
        <div className={`p-10 ${isDarkmode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-xl border h-full`}>
          <Chart 
            type="bar" 
            data={barData} 
            options={barOptions} 
            className="h-full w-full"
          />
        </div>
        
        <div className={`${isDarkmode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-xl border h-full flex justify-center items-center`}>
          <Chart
            type="pie"
            data={pieData}
            options={pieOptions}
            className="w-100"
          />
        </div>
      </div>

      <div className={`flex justify-center items-center mt-10 mb-11 ${isDarkmode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} rounded-xl border p-10`}>
        <Chart
          type="bar"
          data={comboData}
          options={comboOptions}
          className="w-250"
        />
      </div>
    </div>
  )
}
