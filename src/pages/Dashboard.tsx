import { BarChart, PieChart, ComboChart } from "../components/dashboard"
import { Map } from "../components/dashboard/"

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 mx-auto max-w-7xl">
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

