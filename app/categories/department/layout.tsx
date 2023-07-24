import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"

export const metadata = {
    title: 'Create Next App'
}

export default function CategoriesLayout({
    children,
}:{
    children:React.ReactNode
}) {
    return(
           

        <>
            {children}
        </>
          
       
           
        
    )

}