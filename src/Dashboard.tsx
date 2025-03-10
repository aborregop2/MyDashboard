import { MyBarChart } from "./components/ui/barchart"
import { MyAreaChart } from "./components/ui/areachart"
import { MyPieChart } from "./components/ui/piechart"


export default function Dashboard({ darkMode }: { darkMode: boolean }) {
  return (
    <div className={`container mx-auto p-6 ${darkMode ? "dark" : ""}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-60 md:h-180 p-4 rounded-xl bg-background">
          <div className="h-full">
            <MyBarChart darkmode={darkMode} />
          </div>
        </div>

        <div className="h-72 md:h-120 p-4 rounded-xl bg-background">
          <div className="h-full">
            <MyPieChart darkmode={darkMode} />
          </div>
        </div>

        <div className="lg:col-span-3 h-72 md:h-120 p-4 rounded-xl mb-6 bg-background">
          <div className="h-full">
            <MyAreaChart darkmode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  )
}

