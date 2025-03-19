import { Chart } from "primereact/chart";
import { useEffect, useMemo, useState } from "react";
import { useDarkmodeStore } from "../store";
import BarChart from "../components/dashboard/BarChart";
import PieChart from "../components/dashboard/PieChart";
import ComboChart from "../components/dashboard/ComboChart";

export default function Dashboard() {
  const { isDarkmode } = useDarkmodeStore();


  
  

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
