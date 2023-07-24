'use client'
import DataCar from "@/components/DataCar"
import {TabsContent } from "@/components/ui/tabs"
import { isError, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Suspense } from "react"
import Loading from "./loading"
import error from "./error"
import { AuthRequiredError } from "@/lib/exception"
import { PageWrapper } from "@/app/page-wrapper"


type ContentType ={
    id:string,
    title:string,
    description:string,
    date: string
}

const page = () => {
  
    const{data:cardsData} =useQuery<ContentType[]>({
        queryFn:async () =>{
            const{data} = await axios.get(`http://localhost:3000/departmentData`)
            return data
        },
        queryKey:["content-query"],
    })
    if(!isError) throw new AuthRequiredError("ewrt")
    return(

      <PageWrapper >
        <Suspense fallback={<Loading/>}>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinic-50 sm:text">
          </h1>
        <TabsContent value="department" className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {cardsData?.map((card)=>(
            <DataCar key={card.id} data={card}/>
          ))}
  
        </TabsContent>
  
      </Suspense>
      </PageWrapper>
       
    )
}

export default page