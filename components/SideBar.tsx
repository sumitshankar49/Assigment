import { PageWrapper } from "@/app/page-wrapper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"


const SideBar = () => {


  return (

    <div className=" min-w-[13%] min-h-screen transition delay-150 ease-in-out duration-300">
      <Tabs defaultValue=" " className="felx flex-row h-full">
        <TabsList className="w-full h-full flex flex-col justify-start rounded-none">
          <Link href="/" className="w-[100%]"><TabsTrigger className="w-full  mb-2 p-2 " value="home">Home</TabsTrigger></Link>
          <Link href="/categories" className="w-[100%]"><TabsTrigger className="w-full mb-2 p-2" value="categories">Categories</TabsTrigger></Link>
        </TabsList>

      </Tabs>


    </div>



  )
}

export default SideBar