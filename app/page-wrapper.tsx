import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => (
  <>
    <AnimatePresence>
    {/* //  mode="wait"
    //  initial={false}
    //  onExitComplete={() => window.scrollTo(0, 0)} */}
    
      <motion.div
        initial={{ opacity: -1, y: 80 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ delay: 0.90}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </>
);
