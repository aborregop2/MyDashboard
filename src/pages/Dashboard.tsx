import { BarChart, PieChart, ComboChart } from "../components/dashboard"
import { Map } from "../components/dashboard/"
import  MyButton  from "../components/ui/MyButton"
import { FileDown } from "lucide-react"
import { usePDF } from 'react-to-pdf'

export default function Dashboard() {
  const { toPDF, targetRef } = usePDF({
    filename: 'dashboard.pdf',
  })


  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 mx-auto max-w-7xl" ref={targetRef}>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MyButton onClick={() => toPDF()} className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Get PDF
        </MyButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="h-[350px] sm:h-[400px] lg:h-[450px] bg-card rounded-lg shadow overflow-hidden">
          <BarChart />
        </div>
        <div className="h-[350px] sm:h-[400px] lg:h-[450px] bg-card rounded-lg shadow overflow-hidden">
          <PieChart />
        </div>
      </div>

      <div className="h-[350px] sm:h-[400px] lg:h-[500px] bg-card rounded-lg shadow overflow-hidden">
        <ComboChart />
      </div>

      <Map />
    </div>
  )
}