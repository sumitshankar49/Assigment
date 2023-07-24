import { AuthRequiredError } from "@/lib/exception"
import { isError } from "@tanstack/react-query"
import { PageWrapper } from "../page-wrapper"


const page = () => {
  return (

    <>
    </>

  )
}
if (!isError) throw new AuthRequiredError("tyyui")

export default page