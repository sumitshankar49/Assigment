'use client'
import DataCar from "@/components/DataCar"
import { TabsContent } from "@/components/ui/tabs"
import { isError, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Suspense } from "react"
import Loading from "./loading"
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
        const{data} = await axios.get(`http://localhost:3000/designationData`)
        return data
    },
    queryKey:["content-query"],
})
 if(!isError) throw new AuthRequiredError("use a right component")
  return (
    <PageWrapper>
    <Suspense fallback={<Loading/>}>
      <TabsContent value="designation" className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cardsData?.map((card)=>(
          <DataCar key={card.id} data={card}/>
        ))}

      </TabsContent>

    </Suspense>
    </PageWrapper>
  )
}

export default page