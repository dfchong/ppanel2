import { cn } from "@workspace/ui/lib/utils";
import { motion } from "framer-motion";

export const CloseIcon = ({ className }: { className?: string }) => (
  <motion.svg
    animate={{
      opacity: 1,
    }}
    className={cn("h-4 w-4", className)}
    exit={{
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    }}
    fill="none"
    height="24"
    initial={{
      opacity: 0,
    }}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Close</title>
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
