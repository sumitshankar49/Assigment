import { Skeleton } from "@/components/ui/skeleton"
import {Tabs, TabsContent } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const loading = () => {
  return (
    <Tabs>
      <TabsContent value="vbn" className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {["1","1","1","1","1","1","1","1","1","1","1","1"].map((each) => (
          <Card>
          <CardHeader>
            <CardTitle><Skeleton className="w-[100px] h-[20px] rounded-full" /></CardTitle>
          </CardHeader>
          <CardContent>
            <p><Skeleton className="w-[100px] h-[80px] rounded-full" /></p>
          </CardContent>
          <CardHeader>
            <CardDescription><Skeleton className="w-[100px] h-[20px] rounded-full" /></CardDescription>
          </CardHeader>
        </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default loading