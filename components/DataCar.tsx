import { PageWrapper } from "@/app/page-wrapper"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  type DataCardProps = {
    data : {
      id : string,
      title : string,
      description : string,
      date : string
    }
  } 
  
  const DataCar = (data:DataCardProps) => {
    const {id, title, description, date } = data.data
    return (
        <PageWrapper>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardHeader>
        
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        </Card>
      </PageWrapper>
    )
  }
  
  export default DataCar