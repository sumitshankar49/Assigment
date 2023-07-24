'use client'
import EmployeeTable from "@/components/EmployeeTable";
import HomeAr from "@/components/HomeAr";





export default function Home() {

  return (
    
    <div className="flex flex-col w-full p-5 sticky top-6 ">

      <HomeAr />
      <EmployeeTable />
    </div>
  )
}
