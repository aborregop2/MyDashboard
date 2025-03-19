import { BarChart, PieChart, ComboChart } from "../components/dashboard";

export default function Dashboard() {
  return (
    <>
      <div
        className={`w-full min-h-screen p-6`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1 h-[60vh]">
          <BarChart />
          <PieChart />
        </div>

        <ComboChart />
      </div>
    </>
  );
}
